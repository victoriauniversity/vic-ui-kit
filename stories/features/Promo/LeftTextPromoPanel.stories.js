import { createLeftTextPromoPanel } from './LeftTextPromoPanel';

export default {
  title: 'Features/Promos/Left Text Promo Panel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Full Width Promo with Left Aligned Text Panel
A premium promotional grid pattern structured specifically for high-level hub landing domains. This component anchors content blocks tightly to the left margin layout line while framing background images seamlessly behind the text panel mask layer.
        `,
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Primary component title entry text string.' },
    content: { control: 'text', description: 'Central layout informational copy narrative.' },
    buttonText: { control: 'text', description: 'The display label embedded inside the action button container.' },
    buttonUrl: { control: 'text', description: 'Target redirection path for click interactions.' },
    img: { control: 'text', description: 'Background visual landscape photography source path destination.' },
  },
};

// 1. Default view mapping your exact data properties
export const ResearchImpactsPanel = {
  args: {
    heading: 'Research impacts',
    content: 'Victoria’s research output is used at community, national and international levels. Our academic and business partnerships provide global solutions in many fields.',
    buttonText: 'Learn more',
    buttonUrl: '#',
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  },
  render: (args) => createLeftTextPromoPanel(args),
};

// 2. Alternative sandbox test layout variant verifying shorter content streams
export const AlternateHubPanel = {
  args: {
    heading: 'Capital Connections',
    content: 'Engage with industry leaders right across the heart of Wellington’s core commercial frameworks and global startup network ecosystems.',
    buttonText: 'Explore Partnerships',
    buttonUrl: '#',
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  },
  render: (args) => createLeftTextPromoPanel(args),
};
