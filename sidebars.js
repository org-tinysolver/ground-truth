/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🧑 사람을 위한 문서',
      items: [
        'humans/overview',
        {
          type: 'category',
          label: '🚀 프로덕트',
          items: [
            'humans/products/overview',
            {
              type: 'category',
              label: '🤖 AI Company',
              items: [
                'humans/products/ai-pm/overview',
                'humans/products/ai-devteam/overview',
                'humans/products/ai-research/overview',
              ],
            },
            {
              type: 'category',
              label: 'merrymatch',
              items: [
                'humans/products/merrymatch/overview',
              ],
            },
            {
              type: 'category',
              label: 'tinysolver-plugins',
              items: [
                'humans/products/tinysolver-plugins/overview',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '🔨 빌더스',
          items: [
            'humans/builders/overview',
            'humans/builders/poc-guide',
            'humans/builders/mvp-guide',
            'humans/builders/open-contribution',
          ],
        },
        {
          type: 'category',
          label: '🔧 DevOps',
          items: [
            'humans/devops/overview',
            'humans/devops/cicd-pipeline',
            {
              type: 'category',
              label: '🔐 클라우드 권한 획득',
              items: [
                'humans/devops/cloud-setup/overview',
                'humans/devops/cloud-setup/aws-setup',
                'humans/devops/cloud-setup/gcp-setup',
                'humans/devops/cloud-setup/azure-setup',
              ],
            },
          ],
        },
        'humans/examples',
        'humans/contributing',
      ],
    },
    {
      type: 'category',
      label: '🤖 AI Agent 문서',
      items: [
        'agents/overview',
        'agents/org-rules',
        'agents/slack-integration',
        {
          type: 'category',
          label: '📋 규칙 & 기준',
          items: [
            'agents/rules/overview',
            'agents/rules/hitl-boundary',
            'agents/rules/branch-protection',
            'agents/rules/delegation-protocol',
          ],
        },
        {
          type: 'category',
          label: '팀 구조',
          items: [
            'agents/teams/overview',
            'agents/teams/ai-pm',
            'agents/teams/ai-dev',
            'agents/teams/ai-research',
            'agents/teams/workqueue-manager',
            'agents/teams/github-projects',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
