export const repo = 'https://github.com/Momoyeyu/momo-ui';
export const release = repo + '/releases/download/v0.1.0/momo-ui-0.1.0.tgz';

export const groups = [
  {label:'开始使用', pages:[
    {slug:'getting-started', title:'安装与使用', description:'把 momo 的界面组件带进 React 项目。'},
    {slug:'foundation', title:'设计基础', description:'色彩、圆角、排版和交互状态。'},
  ]},
  {label:'组件', pages:[
    {slug:'button', title:'按钮', description:'主操作、图标操作与危险操作。'},
    {slug:'field', title:'表单行', description:'在统一的表单行里组织标签和控件。'},
    {slug:'switch', title:'开关', description:'显示并切换立即生效的二元状态。'},
    {slug:'slider', title:'滑条', description:'调节百分比并即时看到数值。'},
    {slug:'combobox', title:'可搜索选择器', description:'从长列表中查找并选择一个值。'},
    {slug:'panel', title:'面板与弹窗', description:'组织信息，或临时聚焦一项操作。'},
    {slug:'clock-face', title:'时钟表盘', description:'显示调用方格式化后的时间和日期。'},
  ]},
];

export const path = (relative = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + relative;
