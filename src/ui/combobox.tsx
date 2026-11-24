import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from './primitives.js';

export interface Choice {
  value: string;
  label: string;
  keywords?: string;
}

interface ListProps {
  options: readonly Choice[];
  value: string;
  active: number;
  id?: string;
  label: string;
  emptyLabel: string;
  onHighlight?: (index: number) => void;
  onPick?: (value: string) => void;
}

export function ChoiceList({options, value, active, id, label, emptyLabel, onHighlight, onPick}: ListProps) {
  return <ul className="momo-choice-list" id={id} role="listbox" aria-label={label}>
    {options.length === 0 && <li className="momo-choice-empty" role="presentation">{emptyLabel}</li>}
    {options.map((option, index) => <li key={option.value} role="option"
      id={id && id + '-' + index} aria-selected={option.value === value}
      data-highlighted={index === active || undefined}
      onMouseMove={() => onHighlight?.(index)}
      onMouseDown={event => event.preventDefault()}
      onClick={() => onPick?.(option.value)}>
      <span>{option.label}</span>
      {option.value === value && <Icon name="check" size={14}/>}
    </li>)}
  </ul>;
}

export interface ComboboxProps {
  id?: string;
  label: string;
  value: string;
  options: readonly Choice[];
  onChange: (value: string) => void;
  searchLabel: string;
  emptyLabel: string;
  disabled?: boolean;
}

const search = (value: string) => value.normalize('NFKC').toLowerCase().replace(/[_\/]+/g, ' ');

export function Combobox({id, label, value, options, onChange, searchLabel, emptyLabel, disabled}: ComboboxProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const searchTerms = search(query).trim().split(/\s+/).filter(Boolean);
  const visible = searchTerms.length
    ? options.filter(option => {
      const text = search(option.label + ' ' + option.value + ' ' + (option.keywords ?? ''));
      return searchTerms.every(term => text.includes(term));
    })
    : options;
  const selection = options.find(option => option.value === value);
  const shown = open && !disabled;

  function show() {
    setQuery('');
    setActive(Math.max(0, options.findIndex(option => option.value === value)));
    setOpen(true);
  }

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({preventScroll:true});
  }

  function pick(choice: string) {
    close(true);
    if (choice !== value) onChange(choice);
  }

  useEffect(() => {
    if (!shown) return;
    input.current?.focus({preventScroll:true});
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [shown]);

  useLayoutEffect(() => {
    if (!shown) return;
    function fit(event?: Event) {
      const control = root.current;
      const panel = popup.current;
      if (!control || !panel || (event?.target instanceof Node && panel.contains(event.target))) return;
      const rect = control.getBoundingClientRect();
      let top = 0;
      let bottom = window.innerHeight;
      for (let parent = control.parentElement; parent; parent = parent.parentElement) {
        if (!/(auto|scroll|hidden|clip)/.test(getComputedStyle(parent).overflowY)) continue;
        const bounds = parent.getBoundingClientRect();
        top = Math.max(top, bounds.top + parent.clientTop);
        bottom = Math.min(bottom, bounds.top + parent.clientTop + parent.clientHeight);
      }
      const below = bottom - rect.bottom - 8;
      const above = rect.top - top - 8;
      const up = below < 245 && above > below;
      panel.dataset.side = up ? 'top' : 'bottom';
      panel.style.setProperty('--momo-picker-height', Math.max(0, Math.min(245, up ? above : below)) + 'px');
    }
    fit();
    window.addEventListener('resize', fit);
    document.addEventListener('scroll', fit, true);
    return () => {
      window.removeEventListener('resize', fit);
      document.removeEventListener('scroll', fit, true);
    };
  }, [shown]);

  useLayoutEffect(() => {
    if (shown) document.getElementById(listId + '-' + active)?.scrollIntoView({block:'nearest'});
  }, [shown, active, listId]);

  function navigate(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      close(true);
      return;
    }
    if (!visible.length) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      const option = visible[active];
      if (option) pick(option.value);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActive(index => (index + direction + visible.length) % visible.length);
    }
  }

  return <div className="momo-combobox" ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  }}>
    <button id={id} type="button" className="momo-combobox-trigger" ref={trigger}
      aria-label={label + ' · ' + (selection?.label ?? value)}
      aria-haspopup="dialog" aria-expanded={shown} disabled={disabled}
      onClick={() => shown ? close() : show()} onKeyDown={event => {
        if (!shown && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
          event.preventDefault();
          show();
        }
      }}>
      <Icon name="globe" size={16}/>
      <span>{selection?.label ?? value}</span>
      <Icon name="arrow" size={15}/>
    </button>
    {shown && <div className="momo-combobox-panel" ref={popup} role="dialog" aria-label={label}>
      <div className="momo-combobox-search">
        <Icon name="search" size={15}/>
        <input ref={input} role="combobox" aria-label={searchLabel} placeholder={searchLabel}
          aria-expanded="true" aria-controls={listId} aria-autocomplete="list"
          aria-activedescendant={visible[active] ? listId + '-' + active : undefined}
          autoComplete="off" spellCheck={false} value={query}
          onChange={event => {setQuery(event.currentTarget.value);setActive(0);}}
          onKeyDown={navigate}/>
      </div>
      <ChoiceList options={visible} value={value} active={active} id={listId} label={label}
        emptyLabel={emptyLabel} onHighlight={setActive} onPick={pick}/>
    </div>}
  </div>;
}
