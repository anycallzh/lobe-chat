import { ModelTag } from '@lobehub/icons';
import { Skeleton } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ModelSwitchPanel from '@/features/ModelSwitchPanel';
import PluginTag from '@/features/PluginTag';
import { useModelSupportToolUse } from '@/hooks/useModelSupportToolUse';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';

import KnowledgeTag from './KnowledgeTag';

const TitleTags = memo(() => {
  const [model, provider, hasKnowledge] = useAgentStore((s) => [
    agentSelectors.currentAgentModel(s),
    agentSelectors.currentAgentModelProvider(s),
    agentSelectors.hasKnowledge(s),
  ]);
  const plugins = useAgentStore(agentSelectors.currentAgentPlugins, isEqual);
  const enabledKnowledge = useAgentStore(agentSelectors.currentEnabledKnowledge, isEqual);

  const showPlugin = useModelSupportToolUse(model, provider);
  const isLoading = useAgentStore(agentSelectors.isAgentConfigLoading);
  const isLogin = useUserStore(authSelectors.isLogin);

  return isLoading && isLogin ? (
    <Skeleton.Button active size={'small'} style={{ height: 20 }} />
  ) : (
    <Flexbox align={'center'} horizontal>
      <ModelSwitchPanel>
        <ModelTag model={model} />
      </ModelSwitchPanel>
      {showPlugin && plugins?.length > 0 && <PluginTag plugins={plugins} />}
      {hasKnowledge && <KnowledgeTag data={enabledKnowledge} />}
    </Flexbox>
  );
});

export default TitleTags;
