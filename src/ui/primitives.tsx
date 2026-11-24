import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { buttonAttributes, type ButtonSize, type ButtonVariant } from './control.js';

const paths = {
  back: ['M9 5l-6 6 6 6','M3 11h11a5 5 0 0 1 0 10H5'],
  arrow: ['m6 9 6 6 6-6'],
  check: ['m5 12 4 4L19 6'],
  clock: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z','M12 7v5l3 2'],
  close: ['m6 6 12 12','M18 6 6 18'],
  download: ['M12 4v11','m7 10 5 5 5-5','M5 20h14'],
  globe: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z','M3 12h18','M12 3c5 4 5 14 0 18-5-4-5-14 0-18Z'],
  play: ['M8 5.5 19 12 8 18.5Z'],
  search: ['M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z','m14.5 14.5 5 5'],
  settings: ['M5 7h14M5 17h14M9 4v6M15 14v6'],
  trash: ['M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5'],
  upload: ['M12 15V4','m7 9 5-5 5 5','M5 20h14'],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof paths;

export function Icon({name, size = 18}: {name: IconName; size?: number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false">
    {paths[name].map(path => <path key={path} d={path}/>)}
  </svg>;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({variant = 'outline', size = 'md', type = 'button', className, ...props}: ButtonProps) {
  const {class: base, ...attributes} = buttonAttributes(variant, size);
  return <button type={type} {...props} {...attributes}
    className={[base, className].filter(Boolean).join(' ')}/>;
}

export function IconButton({label, icon, className, ...props}: Omit<ButtonProps, 'children' | 'aria-label'> & {
  label: string; icon: IconName;
}) {
  return <Button {...props} aria-label={label} title={props.title ?? label}
    className={['momo-icon-button', className].filter(Boolean).join(' ')}><Icon name={icon}/></Button>;
}

export function Switch({label, checked, onChange, disabled}: {
  label: string; checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean;
}) {
  return <button type="button" className="momo-switch" role="switch" aria-label={label}
    aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}>
    <span aria-hidden="true"/>
  </button>;
}

export function Slider({label, value, onChange, disabled}: {
  label: string; value: number; onChange: (value: number) => void; disabled?: boolean;
}) {
  const percent = Math.max(0, Math.min(100, value));
  return <div className="momo-slider" data-disabled={disabled || undefined}>
    <input aria-label={label} type="range" min={0} max={100} value={percent} disabled={disabled}
      style={{background: 'linear-gradient(90deg,var(--momo-accent) ' + percent + '%,var(--momo-line) ' + percent + '%)'}}
      onChange={event => onChange(event.currentTarget.valueAsNumber)}/>
    <span aria-hidden="true">{percent}%</span>
  </div>;
}

export function Field({label, htmlFor, aside, children}: {
  label: string; htmlFor?: string; aside?: ReactNode; children: ReactNode;
}) {
  return <div className="momo-field">
    <div className="momo-field-label">
      {htmlFor ? <label htmlFor={htmlFor}>{label}</label> : <span>{label}</span>}{aside}
    </div>
    <div className="momo-field-control">{children}</div>
  </div>;
}

export function Panel({title, actions, children}: {
  title?: string; actions?: ReactNode; children: ReactNode;
}) {
  return <section className="momo-panel">
    {(title || actions) && <header>{title && <h2>{title}</h2>}{actions}</header>}
    {children}
  </section>;
}

export function Dialog({open, onClose, label, children}: {
  open: boolean; onClose: () => void; label: string; children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return <dialog ref={ref} className="momo-dialog" aria-label={label}
    onCancel={event => {event.preventDefault(); onClose();}}>
    {children}
  </dialog>;
}

export function ClockFace({time, date, dateTime}: {time: string; date: string; dateTime: string}) {
  return <div className="momo-clock-face">
    <time dateTime={dateTime}>{time}</time>
    <p>{date}</p>
  </div>;
}
