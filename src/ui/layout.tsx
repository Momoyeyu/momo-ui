import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { layoutAttributes, type LayoutOptions, type LayoutTag } from './layout-model.js';

type BoxProps = HTMLAttributes<HTMLElement> & {as?: LayoutTag};
type FlexProps = BoxProps & Pick<LayoutOptions, 'gap' | 'align'>;

function box(kind: string, defaults: LayoutOptions = {}) {
  return function Layout({as: Tag = 'div', className, style, gap, padding, align, wrap, width, gutter, columns, tone, ...props}: BoxProps & LayoutOptions) {
    const {class: base, style: tokens, ...attrs} = layoutAttributes(kind, {
      gap:gap ?? defaults.gap, padding:padding ?? defaults.padding, align:align ?? defaults.align,
      wrap:wrap ?? defaults.wrap, width, gutter, columns, tone:tone ?? defaults.tone,
    });
    return <Tag {...props} {...attrs} className={className ? base + ' ' + className : base}
      style={{...tokens, ...style} as CSSProperties}/>;
  };
}

export const Container: (props: BoxProps & Pick<LayoutOptions, 'width' | 'gutter'>) => ReactNode = box('container');
export const Stack: (props: FlexProps) => ReactNode = box('stack', {gap:'md'});
export const Cluster: (props: FlexProps & Pick<LayoutOptions, 'wrap'>) => ReactNode = box('cluster', {gap:'sm',align:'center',wrap:true});
export const Grid: (props: BoxProps & Pick<LayoutOptions, 'gap' | 'columns' | 'align'>) => ReactNode = box('grid', {gap:'md'});
export const Surface: (props: BoxProps & Pick<LayoutOptions, 'tone' | 'padding'>) => ReactNode = box('surface', {tone:'panel',padding:'md'});

export function Divider({className, ...props}: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={className ? 'momo-divider ' + className : 'momo-divider'}/>;
}

export function SectionHeading({title, description, level = 2, id}: {
  title: string; description?: string; level?: 1 | 2 | 3 | 4 | 5 | 6; id?: string;
}) {
  const Tag = ('h' + level) as 'h2';
  return <header className="momo-section-heading">
    <Tag id={id}>{title}</Tag>{description && <p>{description}</p>}
  </header>;
}

export function EmptyState({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={className ? 'momo-empty ' + className : 'momo-empty'}>{children}</div>;
}
