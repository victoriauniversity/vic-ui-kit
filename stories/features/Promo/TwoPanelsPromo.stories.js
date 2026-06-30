import { createTwoPanelsPromo } from './TwoPanelsPromo';

export default {
  title: 'Features/Promos/Two Panels Promo',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Side-by-Side Twin Promo Panels
A balanced dual-column layout configuration pattern tailored explicitly for top-tier operational gateway channels or main university hub sections. 
- Works dynamically **with or without image graphics**.
- Keeps button behaviors aligned vertically within a uniform presentation matrix.
        `,
      },
    },
  },
  argTypes: {
    panels: {
      control: 'object',
      description: 'An array mapping content properties for each individual twin panel profile.',
    },
  },
};

// Base twin card dataset matching original templates definitions
const defaultMockPanels = [
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
    imgAlt: 'Wellington waterfront',
    heading: 'Study with us',
    content: 'Join Victoria’s world-leading researchers and take your expertise to the next level when you enrol for a PhD, Masters or other postgraduate study with us.',
    buttonText: 'Study with us',
    buttonUrl: '#'
  },
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
    imgAlt: 'Wellington waterfront',
    heading: 'Work with us',
    content: 'We have the technologies and expertise to support collaborations, project resourcing, grant access and the translation of your ideas into impacts.',
    buttonText: 'Work with us',
    buttonUrl: '#'
  }
];

// Variant 1: Complete view with images included
export const WithImages = {
  args: {
    panels: defaultMockPanels,
  },
  render: (args) => createTwoPanelsPromo(args),
};

// Variant 2: Clean presentation testing out fallback structural states without images
export const WithoutImages = {
  args: {
    panels: defaultMockPanels.map(({ img, imgAlt, ...rest }) => rest), // Strip image parameters out of data stream mapping
  },
  render: (args) => createTwoPanelsPromo(args),
};
