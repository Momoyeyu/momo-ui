type Prop = [name: string, type: string, defaultValue: string, description: string];

interface ComponentDoc {
  name: string;
  description: string;
  frameworks: 'react' | 'vue' | 'both';
  props?: Prop[];
  usage: string;
  notes?: string;
}

const native = '继承根元素的 HTML 属性。';
const as: Prop = ['as','LayoutTag','div','使用原生标签保留页面语义。'];
const gap = (value: string): Prop => ['gap','Spacing',value,'相邻子项的间距。'];
const align = (value: string): Prop => ['align','Alignment',value,'start、center、end、stretch 或 baseline。'];

export const docs: ComponentDoc[] = [
  {name:'Button', description:'用文字表达操作，支持四种视觉变体和两个尺寸。', frameworks:'both',
    props:[
      ['variant','primary | outline | ghost | danger','outline','Vue 入口还支持 bare，用于保留调用方样式。'],
      ['size','sm | md','md','按钮尺寸。'],
      ['type','button | submit | reset','button','原生按钮类型。'],
      ['href','string · Vue','—','传入时渲染为链接。'],
    ],
    usage:'<Button variant="primary" onClick={save}>保存</Button>',
    notes:'焦点在按钮上时，Enter 或空格触发操作。支持 disabled、onClick、aria-pressed 等原生属性。'},
  {name:'IconButton', description:'图标按钮，适合返回、播放、删除等常用动作。', frameworks:'react',
    props:[['icon','IconName','必填','图标名称。'],['label','string','必填','可访问名称及默认提示文字。'],['variant','primary | outline | ghost | danger','outline','按钮的视觉变体。'],['size','sm | md','md','按钮尺寸。']],
    usage:'<IconButton icon="settings" label="配置语音" onClick={open} />',
    notes:'开关式图标按钮可传入 aria-pressed，并保持 label 表达同一个操作。'},
  {name:'Icon', description:'图标目录，展示包内公开的每个图标。', frameworks:'react',
    props:[['name','IconName','必填','使用示例中列出的名称。'],['size','number','18','图标边长，单位 px。']],
    usage:'<Icon name="clock" size={24} />',notes:'图标从可访问树隐藏。独立操作请使用 IconButton，为操作提供名称。'},
  {name:'Link', description:'链接文字，支持强调样式和由调用方绘制的样式。', frameworks:'vue',
    props:[['href','string','必填','跳转目标。'],['variant','accent | bare','accent','控制是否使用组件的强调样式。']],
    usage:'<Link href="/docs">阅读文档</Link>',notes:'保留原生链接语义，可传入 target、rel 等属性。'},
  {name:'Switch', description:'切换一项立即生效的二元设置。', frameworks:'react',
    props:[['label','string','必填','可访问名称。'],['checked','boolean','必填','当前开关状态。'],['onChange','(checked: boolean) => void','必填','用户切换时收到新状态。'],['disabled','boolean','false','禁止操作。']],
    usage:'const [enabled, setEnabled] = useState(false);\n\n<Switch label="显示状态" checked={enabled} onChange={setEnabled} />',
    notes:'Tab 聚焦，空格或 Enter 切换。'},
  {name:'Slider', description:'调节 0–100 的百分比并即时显示数值。', frameworks:'react',
    props:[['label','string','必填','可访问名称。'],['value','number','必填','当前百分比，显示范围为 0–100。'],['onChange','(value: number) => void','必填','拖动或键盘调整时收到新值。'],['disabled','boolean','false','禁止调节，保留显示值。']],
    usage:'const [volume, setVolume] = useState(65);\n\n<Slider label="语音音量" value={volume} onChange={setVolume} />',
    notes:'聚焦后支持方向键及 Home、End。'},
  {name:'Field', description:'统一一行中的可见标签、辅助内容和控件位置。', frameworks:'react',
    props:[['label','string','必填','可见标签。'],['htmlFor','string','—','关联输入控件的 id。'],['aside','ReactNode','—','标签旁的辅助内容。'],['children','ReactNode','必填','右侧控件。']],
    usage:'<Field label="显示名称" htmlFor="display-name">\n  <input id="display-name" name="displayName" />\n</Field>',
    notes:'一行内放置多个操作时，分别为操作提供可访问名称。'},
  {name:'Combobox', description:'输入关键词筛选，并从较长的选项列表中选择一个值。', frameworks:'react',
    props:[['label','string','必填','控件的可访问名称。'],['searchLabel','string','必填','搜索输入的可访问名称与占位文案。'],['emptyLabel','string','必填','没有匹配项时的提示。'],['value','string','必填','当前选项值。'],['options','readonly Choice[]','必填','每项包含 value、label，可选 keywords。'],['onChange','(value: string) => void','必填','选择后收到值。'],['id','string','—','触发按钮的 ID。'],['disabled','boolean','false','禁止打开。']],
    usage:'const [zone, setZone] = useState("Asia/Shanghai");\n\n<Combobox label="时区" value={zone} onChange={setZone}\n  searchLabel="搜索时区" emptyLabel="未找到时区"\n  options={[{value: "Asia/Shanghai", label: "Asia/Shanghai", keywords: "上海"}]}\n/>',
    notes:'用 Enter、空格或方向键打开，输入筛选，上下键移动高亮，Enter 选中，Escape 返回触发按钮。'},
  {name:'Dialog', description:'让用户在临时浮层里完成一项独立操作。', frameworks:'react',
    props:[['open','boolean','必填','是否打开。'],['onClose','() => void','必填','按 Escape 时调用。'],['label','string','必填','弹窗可访问名称。'],['children','ReactNode','必填','弹窗内容。']],
    usage:'const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>打开</Button>\n<Dialog label="确认保存" open={open} onClose={() => setOpen(false)}>\n  <p>要保存这些设置吗？</p>\n  <Button onClick={() => setOpen(false)}>关闭</Button>\n</Dialog>',
    notes:'用 open 同步显示状态。提供可见的关闭操作，焦点进入弹窗并在关闭后返回。'},
  {name:'Panel', description:'有独立标题和操作区的内容面板。', frameworks:'react',
    props:[['title','string','—','面板标题。'],['actions','ReactNode','—','标题行的操作区。'],['children','ReactNode','必填','面板正文。']],
    usage:'<Panel title="对话" actions={<Button size="sm">管理</Button>}>\n  <p>面板正文</p>\n</Panel>'},
  {name:'ClockFace', description:'用等宽数字显示调用方格式化好的时间与日期。', frameworks:'react',
    props:[['time','string','必填','格式化后的时间。'],['date','string','必填','格式化后的日期。'],['dateTime','string','必填','机器可读的 ISO 时间。']],
    usage:'<ClockFace time="09:41" date="11月24日星期二"\n  dateTime="2026-11-24T09:41:00+08:00" />',
    notes:'更新频率、语言和时区由应用管理。'},
  {name:'Container', description:'居中布局并限制内容最大宽度。', frameworks:'both',
    props:[as,['width','string','1120px','最大宽度，可使用 CSS 长度。'],['gutter','string','16px','两侧内边距。']],
    usage:'<Container as="main" width="36rem" gutter="16px">\n  页面内容\n</Container>',notes:native},
  {name:'Stack', description:'将子项纵向堆叠，统一间距和横向对齐。', frameworks:'both',
    props:[as,gap('md'),align('stretch')],
    usage:'<Stack gap="sm" align="start">\n  <div>标题</div>\n  <div>正文</div>\n</Stack>',notes:native},
  {name:'Cluster', description:'横向排列一组操作或标签，必要时换行。', frameworks:'both',
    props:[as,gap('sm'),align('center'),['wrap','boolean','true','允许子项换行。']],
    usage:'<Cluster gap="sm" wrap={false}>\n  <span>取消</span><span>确认</span>\n</Cluster>',notes:native},
  {name:'Grid', description:'用等宽列组织手机应用、选项或卡片。', frameworks:'both',
    props:[as,gap('md'),align('stretch'),['columns','number','1','等宽列数。']],
    usage:'<Grid columns={2} gap="sm">\n  <div>时钟</div><div>记事本</div>\n</Grid>',notes:native},
  {name:'Surface', description:'为内容区域提供底色、描边、圆角和内边距。', frameworks:'both',
    props:[as,['tone','panel | inset | plain','panel','底色与描边方案。'],['padding','Spacing','md','容器内边距。']],
    usage:'<Surface as="section" tone="inset" padding="sm">\n  音量设置\n</Surface>',notes:native},
  {name:'SectionHeading', description:'带标题层级和可选描述的区块标题。', frameworks:'both',
    props:[['title','string','必填','区块标题。'],['description','string','—','次要描述。'],['level','1 | 2 | 3 | 4 | 5 | 6','2','原生标题层级。'],['id','string','—','设置在标题元素上，可用于 aria-labelledby。']],
    usage:'<SectionHeading title="声音" level={2}\n  description="调整语音、音效和音乐。" id="sound" />'},
  {name:'Divider', description:'在连续内容之间绘制语义分隔线。', frameworks:'both',
    usage:'<Divider />',notes:native},
  {name:'EmptyState', description:'在暂无内容、加载失败等场景中提示用户当前状态。', frameworks:'both',
    usage:'<EmptyState role="status">这里还没有记录。</EmptyState>',
    notes:'通过 children 或默认插槽提供提示，可传入 role="status" 发布状态更新。'},
];

export function componentSlug(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export const interactiveNames = ['Button','IconButton','Switch','Slider','Field','Combobox','Dialog','Panel','ClockFace'] as const;
export type InteractiveName = typeof interactiveNames[number];
