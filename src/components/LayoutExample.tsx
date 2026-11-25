import { Button } from '../ui/primitives';
import { Cluster, Container, Divider, EmptyState, Grid, SectionHeading, Stack, Surface } from '../ui/layout';

export default function LayoutExample() {
  return <Container width="36rem" gutter="0">
    <Surface>
      <Stack>
        <SectionHeading title="手机应用" description="选择一个应用查看内容。"/>
        <Grid columns={2} gap="sm">
          <Surface tone="inset" padding="sm">时钟</Surface>
          <Surface tone="inset" padding="sm">记事本</Surface>
        </Grid>
        <Divider/>
        <EmptyState>这里还没有其他应用。</EmptyState>
        <Cluster gap="sm"><Button variant="primary">打开</Button><Button>返回</Button></Cluster>
      </Stack>
    </Surface>
  </Container>;
}
