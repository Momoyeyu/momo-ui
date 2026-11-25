import {Cluster, Container, Divider, EmptyState, Grid, Icon, SectionHeading, Stack, Surface} from '../ui';
import type {IconName} from '../ui';

const icons: Record<IconName, true> = {
  back:true, arrow:true, check:true, clock:true, close:true, download:true,
  globe:true, play:true, search:true, settings:true, trash:true, upload:true,
};

export default function StaticDemo({name}:{name:string}) {
  switch (name) {
    case 'Icon':
      return <ul className="demo-icons">
        {(Object.keys(icons) as IconName[]).map(icon => <li key={icon}><Icon name={icon} size={24}/><code>{icon}</code></li>)}
      </ul>;
    case 'Container':
      return <div className="demo-stack">
        <div className="demo-stage"><Container width="20rem" gutter="16px"><div className="demo-block">width="20rem"</div></Container></div>
        <div className="demo-stage"><Container width="32rem" gutter="32px"><div className="demo-block">width="32rem"</div></Container></div>
      </div>;
    case 'Stack':
      return <div className="demo-pair">
        <div><p className="demo-label">gap="xs"</p><Stack gap="xs"><div className="demo-block">标题</div><div className="demo-block">正文</div></Stack></div>
        <div><p className="demo-label">gap="lg"</p><Stack gap="lg"><div className="demo-block">标题</div><div className="demo-block">正文</div></Stack></div>
      </div>;
    case 'Cluster':
      return <div className="demo-pair">
        <div><p className="demo-label">默认换行</p><Cluster className="demo-narrow"><span className="demo-block">语音状态</span><span className="demo-block">对话记录</span><span className="demo-block">角色偏好</span></Cluster></div>
        <div><p className="demo-label">wrap=false</p><Cluster wrap={false} className="demo-cluster-flow"><span className="demo-block">取消</span><span className="demo-block">保存</span><span className="demo-block">还原</span></Cluster></div>
      </div>;
    case 'Grid':
      return <div className="demo-stack">
        <Grid columns={2} gap="sm"><div className="demo-block">第 1 列</div><div className="demo-block">第 2 列</div></Grid>
        <Grid columns={3} gap="sm"><div className="demo-block">第 1 列</div><div className="demo-block">第 2 列</div><div className="demo-block">第 3 列</div></Grid>
      </div>;
    case 'Surface':
      return <div className="demo-surfaces">
        <Surface tone="panel" padding="sm">panel</Surface><Surface tone="inset" padding="sm">inset</Surface><Surface tone="plain" padding="sm">plain</Surface>
      </div>;
    case 'SectionHeading':
      return <div className="demo-stack">
        <SectionHeading title="声音" description="调整语音、音效和音乐。" level={2}/>
        <SectionHeading title="语音音量" level={3}/>
      </div>;
    case 'Divider':
      return <div className="demo-stack"><div>分隔线之前</div><Divider/><div>分隔线之后</div></div>;
    case 'EmptyState':
      return <div className="demo-pair"><EmptyState>这里还没有任何记录。</EmptyState><EmptyState>暂时无法读取记录。</EmptyState></div>;
    default:
      return null;
  }
}
