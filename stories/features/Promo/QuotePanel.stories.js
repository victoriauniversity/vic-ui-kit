import { createQuotePanel } from './QuotePanel';

export default {
  title: 'Features/Promos/Quote Panel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Promo Quote Panel
Designed to feature key institutional statements, researcher citations, and high-impact statistics. Supports configuration flexibility to function with or without an active outer anchor link wrapper.
        `,
      },
    },
  },
  argTypes: {
    quoteText: { control: 'text', description: 'The inner quote statement content displayed inside an H3 wrapper.' },
    authorName: { control: 'text', description: 'The citation target name text identity token.' },
    authorTitle: { control: 'text', description: 'The secondary title metadata description segment line.' },
    url: { control: 'text', description: 'Optional hyperlink target. Clear this field to convert the promo block into a static text element.' },
  },
};

// 1. Linked layout state matching original design specification
export const LinkedQuote = {
  args: {
    quoteText: 'Our researchers are making a positive impact - on the lives and wellbeing of people - not just in New Zealand, but around the world - through exceptional innovation and research.',
    authorName: 'Professor Kate Mcgrath',
    authorTitle: 'Vice-Provost (Research)',
    url: '#',
  },
  render: (args) => createQuotePanel(args),
};

// 2. Static layout variant testing out fallback behavior without anchor markup wrapper
export const StaticQuote = {
  args: {
    quoteText: 'Victoria University of Wellington provides a thriving hub for exceptional engineering innovation, changing browser framework engineering structures forever.',
    authorName: 'Faculty of Engineering Research Collective',
    authorTitle: 'Global Compilers Division (2026)',
    url: '', // Empty string drops anchor container wrap layers cleanly
  },
  render: (args) => createQuotePanel(args),
};
