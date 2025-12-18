/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 프로덕트',
      items: [
        'products/overview',
        {
          type: 'category',
          label: 'merrymatch',
          items: [
            'products/merrymatch/overview',
            // TODO: 세부 문서 추가 시 여기에 추가
          ],
        },
        {
          type: 'category',
          label: 'tinysolver-plugins',
          items: [
            'products/tinysolver-plugins/overview',
            // TODO: 세부 문서 추가 시 여기에 추가
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🔨 빌더스',
      items: [
        'builders/overview',
        'builders/poc-guide',
        'builders/mvp-guide',
        'builders/open-contribution',
      ],
    },
    {
      type: 'category',
      label: '🔧 DevOps',
      items: [
        'devops/overview',
        'devops/cicd-pipeline',
        {
          type: 'category',
          label: '🔐 클라우드 권한 획득',
          items: [
            'devops/cloud-setup/overview',
            'devops/cloud-setup/aws-setup',
            'devops/cloud-setup/gcp-setup',
            'devops/cloud-setup/azure-setup',
          ],
        },
      ],
    },
    'examples',
    'contributing',
  ],
};

export default sidebars;
