import { createFullWidthPromoList } from './FullWidthPromoList';

export default {
  title: 'Features/Promos/Full Width Promo List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Full Width Promo with Links List
[TA] - Full width promo with links list component design variant framework token.
Ref Link: WIP-1682
        `,
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Primary component core sector header string value.' },
    description: { control: 'text', description: 'Central layout summary copy parameter block.' },
    backgroundImage: { control: 'text', description: 'Graphic texture layout target pattern image URL background mapping source.' },
    links: { control: 'object', description: 'Collection array supplying dynamic interaction text assets and destinations.' },
  },
};

const defaultMockLinks = [
  { text: 'Parents and whānau', url: '#' },
  { text: 'Māori at Victoria', url: '#' },
  { text: 'Pasifika at Victoria', url: '#' },
  { text: 'Student services and support', url: '#' }
];

export const DefaultPatternPanel = {
  args: {
    heading: 'Community, culture and support',
    description: 'Victoria is a welcoming place full of people from a diverse range of communities. There are all sorts of resources and support available to help you make the best of your time at wgtn.',
    backgroundImage: 'https://www.wgtn.ac.nz/__data/assets/image/0005/216698/maori-bg-pattern.png',
    links: defaultMockLinks,
  },
  render: (args) => createFullWidthPromoList(args),
};

export const CustomCommunityVariant = {
  args: {
    heading: 'International Research Networks',
    description: 'Connecting global students straight to regional community teams and innovative workspace frameworks across Christchurch and Wellington environments.',
    backgroundImage: '', // Renders cleanly without a background image mapping option hook
    links: [
      { text: 'Global Partners', url: '#', title: 'View global partners' },
      { text: 'Funding Frameworks', url: '#' }
    ],
  },
  render: (args) => createFullWidthPromoList(args),
};
