import { createPromoPanel } from './PromoPanel';
import { createVideoPromo } from './VideoPromo';
import { createTitleImagePromo } from './TitleImagePromo';

export default {
  title: 'Features/Promos/Promo Panels',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Column Width Promo Panels
Layout blocks supporting structural variations for homepages and main landing sectors.
- **Split View:** A 2/3 and 1/3 asymmetrical column distribution.
- **Standard View:** Full-width promotional frame blocks with optional text alignment orientations.
        `,
      },
    },
  },
  argTypes: {
    isSplitLayout: {
      control: 'boolean',
      description: 'Toggles the two-one-third grid width ratio modifier class rule.',
    },
    panels: {
      control: 'object',
      description: 'Array matching custom figure structures with headlines, paragraphs, and primary action buttons.',
    },
  },
};

// Pattern 1: [TA] - Column Width Promo Panel split 2/3 1/3 (HP)
export const SplitPromoPanel = {
  args: {
    isSplitLayout: true,
    panels: [
      {
        img: 'https://www.wgtn.ac.nz/__data/assets/image/0010/294427/varieties/ls_small.jpg',
        heading: 'Get the global perspective',
        content: 'Every student of Commerce has got unique opportunity to take a part in exchange in any of 115 partner countries.',
        linkLabel: 'International Exchange',
        linkTitle: 'Why to study at Victoria',
        linkUrl: 'https://www.wgtn.ac.nz/about/victorias-story/statistics'
      },
      {
        heading: 'Join our brilliant research team and be a part of something magnificent!',
        linkLabel: 'Join the research',
        linkTitle: 'Why to study at Victoria',
        linkUrl: 'https://www.wgtn.ac.nz/about/victorias-story/statistics'
      }
    ]
  },
  render: (args) => createPromoPanel(args),
};

// Pattern 2: [TA] - Column Width Promo Panel with Image (HP)
export const FullWidthRightImagePromoPanel = {
  args: {
    isSplitLayout: false,
    panels: [
      {
        img: 'https://www.wgtn.ac.nz/__data/assets/image/0010/294427/varieties/ls_small.jpg',
        imgRtl: true,
        heading: 'Living in Wellington',
        content: 'Hear our students talk about why they love living in the capital city.',
        linkLabel: 'Watch the video',
        linkTitle: 'Play the video about Wellington',
        linkUrl: '#'
      }
    ]
  },
  render: (args) => createPromoPanel(args),
};

export const FullWidthLeftImagePromoPanel = {
  args: {
    isSplitLayout: false,
    panels: [
      {
        img: 'https://www.wgtn.ac.nz/__data/assets/image/0010/294427/varieties/ls_small.jpg',
        imgRtl: false,
        heading: 'Living in Wellington',
        content: 'Hear our students talk about why they love living in the capital city.',
        linkLabel: 'Watch the video',
        linkTitle: 'Play the video about Wellington',
        linkUrl: '#'
      }
    ]
  },
  render: (args) => createPromoPanel(args),
};

// Pattern 3: [TA] - column width promo with text and button (+HP)(MVP)
// Ref: https://victoriauniversity.atlassian.net/browse/WIP-2079
export const TextAndButtonPromoPanel = {
  args: {
    isSplitLayout: false,
    panels: [
      {
        // Heading maps to H2 per your Handlebars markup structure variations
        heading: '<h2>When you first arrive</h2>',
        content: 'Settle into life in New Zealand by checking out the campus, Wellington city and your new accommodation.',
        linkLabel: 'Student services',
        linkTitle: 'Check out our student services',
        linkUrl: '#'
      }
    ]
  },
  render: (args) => {
    // Sanitize heading mapping to respect the requested H2 tag structure variant dynamically
    const cleanArgs = {
      ...args,
      panels: args.panels.map(panel => ({
        ...panel,
        // Override default H1 wrapped behavior in child template loop string
        heading: panel.heading.includes('<h2>') ? panel.heading : `<h2>${panel.heading}</h2>`
      }))
    };
    
    // Intercept template mapping string to prevent double heading wrapping layers
    let renderedHtml = createPromoPanel(cleanArgs);
    return renderedHtml.replace('<h1><h2>', '<h2>').replace('</h2></h1>', '</h2>');
  },
};

export const VideoPromo = {
  render: () => createVideoPromo(),
};

export const TitleImagePromo = {
  render: () => createTitleImagePromo(),
};


