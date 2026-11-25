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

import { layoutAttributes, type LayoutOptions, type LayoutTag } from './layout-model.js';

const asTag = {type:String as PropType<LayoutTag>,default:'div'};
const gapProp = String as PropType<LayoutOptions['gap']>;
const alignProp = String as PropType<LayoutOptions['align']>;
export const Container = defineComponent({
  name:'MomoContainer',
  props:{as:asTag,width:String,gutter:String},
  setup(props,{slots}) {return () => h(props.as,layoutAttributes('container',props),slots.default?.());},
});
export const Stack = defineComponent({
  name:'MomoStack',
  props:{as:asTag,gap:{type:gapProp,default:'md'},align:alignProp},
  setup(props,{slots}) {return () => h(props.as,layoutAttributes('stack',props),slots.default?.());},
});
export const Cluster = defineComponent({
  name:'MomoCluster',
  props:{as:asTag,gap:{type:gapProp,default:'sm'},align:{type:alignProp,default:'center'},wrap:{type:Boolean,default:true}},
  setup(props,{slots}) {return () => h(props.as,layoutAttributes('cluster',props),slots.default?.());},
});
export const Grid = defineComponent({
  name:'MomoGrid',
  props:{as:asTag,gap:{type:gapProp,default:'md'},columns:Number,align:alignProp},
  setup(props,{slots}) {return () => h(props.as,layoutAttributes('grid',props),slots.default?.());},
});
export const Surface = defineComponent({
  name:'MomoSurface',
  props:{as:asTag,tone:{type:String as PropType<LayoutOptions['tone']>,default:'panel'},padding:{type:gapProp,default:'md'}},
  setup(props,{slots}) {return () => h(props.as,layoutAttributes('surface',props),slots.default?.());},
});
export const Divider = defineComponent({
  name:'MomoDivider',
  setup() {return () => h('hr',{class:'momo-divider'});},
});
export const SectionHeading = defineComponent({
  name:'MomoSectionHeading',
  props:{title:{type:String,required:true},description:String,level:{type:Number as PropType<1|2|3|4|5|6>,default:2},id:String},
  setup(props) {return () => h('header',{class:'momo-section-heading'},[
    h('h'+props.level,{id:props.id},props.title),
    props.description ? h('p',props.description) : null,
  ]);},
});
export const EmptyState = defineComponent({
  name:'MomoEmptyState',
  setup(_, {slots}) {return () => h('div',{class:'momo-empty'},slots.default?.());},
});
