import { defineComponent, h, type PropType } from 'vue';
import { buttonAttributes, type ButtonSize, type ButtonVariant } from './control.js';

export const Button = defineComponent({
  name: 'MomoButton',
  props: {
    href: String,
    type: {type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button'},
    variant: {type: String as PropType<ButtonVariant | 'bare'>, default: 'outline'},
    size: {type: String as PropType<ButtonSize>, default: 'md'},
  },
  setup(props, {slots}) {
    return () => h(
      props.href === undefined ? 'button' : 'a',
      {...buttonAttributes(props.variant, props.size), ...(props.href === undefined ? {type: props.type} : {href: props.href})},
      slots.default?.(),
    );
  },
});

export const Link = defineComponent({
  name: 'MomoLink',
  props: {
    href: {type: String, required: true},
    variant: {type: String as PropType<'accent' | 'bare'>, default: 'accent'},
  },
  setup(props, {slots}) {
    return () => h('a', {href: props.href, class: props.variant === 'accent' ? 'momo-text-link' : undefined}, slots.default?.());
  },
});
