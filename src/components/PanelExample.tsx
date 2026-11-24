import { Field, IconButton, Panel, Switch } from '../ui/primitives';

export default function PanelExample() {
  return <div className="example-field">
    <Panel title="对话" actions={<IconButton icon="settings" label="管理" variant="ghost"/>}>
      <Field label="显示状态"><Switch label="显示状态" checked={true} onChange={() => {}}/></Field>
    </Panel>
  </div>;
}
