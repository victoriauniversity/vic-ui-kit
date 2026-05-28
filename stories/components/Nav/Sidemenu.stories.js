export default {
  title: 'Components/Nav/Sidemenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
Left-hand side navigation menu that can accommodate up to 4 levels of structural depth.

### Requirements
- To enable dynamic expanding/collapsing of nested sub-menus, the framework logic requires tracking expander triggers. This is simulated natively within the story lifecycle context.

### HTML Attributes
- \`data-gtm-track\` (optional): If specified, streams diagnostic analytical payloads regarding menu actions and panel expansions.
        `,
      },
    },
  },
  argTypes: {
    gtmTrack: { 
      control: 'boolean', 
      name: 'Enable GTM Tracking (data-gtm-track)',
    },
    mobileToggleLabel: { control: 'text', name: 'Mobile Toggle Title' },
  },
  args: {
    gtmTrack: true,
    mobileToggleLabel: 'Research menu',
  },
  render: (args) => {
    return ``;
  },
};
