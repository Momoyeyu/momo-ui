import {componentSlug, docs} from './component-docs';

export const repo = 'https://github.com/Momoyeyu/momo-ui';
export const release = 'https://momoyeyu.github.io/momo-ui/packages/momo-ui-0.3.0.tgz';

export const components = docs.map(doc => ({...doc, title:doc.name, slug:componentSlug(doc.name)}));
const group = (label: string, names: string[]) => ({
  label,
  pages: names.map(name => components.find(component => component.name === name)!),
});

export const groups = [
  {label:'开始使用', pages:[
    {slug:'getting-started', title:'安装与使用'},
    {slug:'foundation', title:'设计基础'},
  ]},
  group('操作与输入', ['Button','IconButton','Link','Switch','Slider','Field','Combobox']),
  group('基础布局', ['Container','Stack','Cluster','Grid','Surface','Divider']),
  group('内容与反馈', ['SectionHeading','Panel','Dialog','EmptyState','ClockFace','Icon']),
];

export const path = (relative = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + relative;
