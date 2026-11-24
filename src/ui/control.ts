export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export function buttonAttributes(variant: ButtonVariant | 'bare', size: ButtonSize) {
  return variant === 'bare' ? {} : {class: 'momo-button', 'data-variant': variant, 'data-size': size};
}
