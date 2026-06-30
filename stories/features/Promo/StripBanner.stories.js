import { createStripBanner } from './StripBanner';

export default {
  title: 'Features/Promos/Strip Banner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Strip Banner Promo Panel
A sleek, reduced-height banner layout designed to break up page flows or display high-level regional updates. It blends full-width aerial or textured photography with a clean layout box structure.
        `,
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Primary component title string.' },
    content: { control: 'text', description: 'Informational descriptive text narrative summary block.' },
    img: { control: 'text', description: 'Visual asset URL path mapped directly to the background container.' },
  },
};

// 1. Default configured view matching your Handlebars template content tokens
export const DefaultStripBanner = {
  args: {
    heading: 'Aerial Campus Insights',
    content: 'An overview of structural expansions, transport updates, and building transformations taking place across our Kelburn campus sectors.',
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  },
  render: (args) => createStripBanner(args),
};

// 2. Secondary variant to verify text scaling and content fallback rendering shapes
export const MinimalContentVariant = {
  args: {
    heading: 'Victoria University Capital Networks',
    content: 'Connecting regional community partnerships with next-generation research programs.',
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  },
  render: (args) => createStripBanner(args),
};
