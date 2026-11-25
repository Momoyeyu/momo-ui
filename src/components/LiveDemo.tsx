import {useState} from 'react';
import {Button, ClockFace, Combobox, Dialog, Field, IconButton, Panel, Slider, Switch} from '../ui';
import type {InteractiveName} from '../component-docs';

function ButtonDemo() {
  const [count, setCount] = useState(0);
  const press = () => setCount(count => count + 1);
  return <>
    <div className="example-row">
      <Button variant="primary" onClick={press}>保存</Button>
      <Button onClick={press}>取消</Button>
      <Button variant="ghost" onClick={press}>跳过</Button>
      <Button variant="danger" onClick={press}>删除</Button>
      <Button size="sm" onClick={press}>小尺寸</Button>
      <Button disabled>禁用</Button>
    </div>
    <p className="demo-feedback" role="status">已触发 {count} 次</p>
  </>;
}

function IconButtonDemo() {
  const [active, setActive] = useState(false);
  const [notice, setNotice] = useState('尚未操作');
  return <>
    <div className="example-row">
      <IconButton icon="settings" label="设置" onClick={() => setNotice('已点击设置')}/>
      <IconButton icon="play" label="播放" aria-pressed={active} variant="primary"
        onClick={() => {setActive(!active);setNotice(active ? '已暂停' : '已播放');}}/>
      <IconButton icon="back" label="返回" size="sm" variant="ghost" onClick={() => setNotice('已点击返回')}/>
      <IconButton icon="trash" label="删除" variant="danger" onClick={() => setNotice('已点击删除')}/>
      <IconButton icon="download" label="下载（禁用）" disabled/>
    </div>
    <p className="demo-feedback" role="status">{notice}</p>
  </>;
}

function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);
  return <div className="demo-control">
    <div className="demo-setting">
      <span>显示对话状态</span><Switch label="显示对话状态" checked={enabled} onChange={setEnabled}/>
    </div>
    <div className="demo-setting">
      <span>桌面访问（禁用）</span><Switch label="桌面访问" checked={false} disabled onChange={() => {}}/>
    </div>
    <p className="demo-feedback" role="status">{enabled ? '已开启' : '已关闭'}</p>
  </div>;
}

function SliderDemo() {
  const [volume, setVolume] = useState(65);
  return <div className="demo-control">
    <p className="demo-label">语音音量</p>
    <Slider label="语音音量" value={volume} onChange={setVolume}/>
    <p className="demo-label demo-secondary">音乐音量（禁用）</p>
    <Slider label="音乐音量" value={35} disabled onChange={() => {}}/>
  </div>;
}

function FieldDemo() {
  const [name, setName] = useState('momo');
  return <div className="demo-control">
    <Field label="显示名称" htmlFor="example-display-name">
      <input id="example-display-name" value={name} onChange={event => setName(event.target.value)}/>
    </Field>
    <Field label="角色名" htmlFor="example-role" aside={<small>只读</small>}>
      <input id="example-role" value="momo" readOnly/>
    </Field>
    <p className="demo-feedback" role="status">当前显示名称：{name || '未填写'}</p>
  </div>;
}

const options = [
  {value:'Asia/Shanghai', label:'Asia/Shanghai',keywords:'上海'},
  {value:'Asia/Tokyo', label:'Asia/Tokyo',keywords:'东京'},
  {value:'Europe/Paris', label:'Europe/Paris',keywords:'巴黎'},
  {value:'America/New_York', label:'America/New York',keywords:'纽约'},
];

function ComboboxDemo() {
  const [zone, setZone] = useState('Asia/Shanghai');
  return <div className="demo-control">
    <Combobox label="时区" value={zone} options={options} onChange={setZone}
      searchLabel="搜索时区" emptyLabel="未找到时区"/>
    <p className="demo-feedback" role="status">当前选择：{zone}</p>
    <p className="demo-label demo-secondary">禁用状态</p>
    <Combobox label="时区选择（禁用）" value="Asia/Tokyo" options={options} onChange={() => {}}
      searchLabel="搜索时区" emptyLabel="未找到时区" disabled/>
  </div>;
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  return <>
    <Button variant="primary" onClick={() => setOpen(true)}>打开确认弹窗</Button>
    <p className="demo-feedback" role="status">{saved ? '已保存' : '待确认'}</p>
    <Dialog label="确认保存" open={open} onClose={() => setOpen(false)}>
      <h3>确认保存</h3>
      <p>要保存这次更改吗？</p>
      <div className="example-row">
        <Button onClick={() => setOpen(false)}>取消</Button>
        <Button variant="primary" onClick={() => {setSaved(true);setOpen(false);}}>保存</Button>
      </div>
    </Dialog>
  </>;
}

function PanelDemo() {
  const [expanded, setExpanded] = useState(true);
  return <div className="demo-control demo-stack">
    <Panel title="对话设置" actions={
      <Button size="sm" aria-expanded={expanded} aria-controls="panel-example-body"
        onClick={() => setExpanded(value => !value)}>{expanded ? '收起' : '展开'}</Button>
    }>
      <p id="panel-example-body" hidden={!expanded}>这里显示面板正文。</p>
    </Panel>
    <Panel><p className="demo-panel-text">无标题的面板。</p></Panel>
  </div>;
}

function ClockFaceDemo() {
  const [utc, setUTC] = useState(false);
  return <div className="demo-control">
    <ClockFace time={utc ? '01:41' : '09:41'} date="11月24日星期二" dateTime="2026-11-24T01:41:00Z"/>
    <Button size="sm" aria-pressed={utc} onClick={() => setUTC(value => !value)}>UTC</Button>
  </div>;
}

const demos = {
  Button:ButtonDemo, IconButton:IconButtonDemo, Switch:SwitchDemo, Slider:SliderDemo,
  Field:FieldDemo, Combobox:ComboboxDemo, Dialog:DialogDemo, Panel:PanelDemo, ClockFace:ClockFaceDemo,
};

export default function LiveDemo({name}: {name:InteractiveName}) {
  const Demo = demos[name];
  return <Demo/>;
}
