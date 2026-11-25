export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LayoutTag = 'div' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav' | 'ul' | 'ol';
export type Alignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export interface LayoutOptions {
  gap?: Spacing;
  padding?: Spacing;
  align?: Alignment;
  wrap?: boolean;
  width?: string;
  gutter?: string;
  columns?: number;
  tone?: 'panel' | 'inset' | 'plain';
}

export function layoutAttributes(kind: string, options: LayoutOptions) {
  return {
    class: 'momo-' + kind,
    'data-gap': options.gap,
    'data-padding': options.padding,
    'data-align': options.align,
    'data-wrap': options.wrap || undefined,
    'data-tone': options.tone,
    style: {
      '--momo-container-width': options.width,
      '--momo-container-gutter': options.gutter,
      '--momo-layout-columns': options.columns,
    },
  };
}
