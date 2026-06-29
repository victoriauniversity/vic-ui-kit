import { createNews } from './News';
import { createNewsMedia } from './NewsMedia';

export default {
  title: 'Features/News/News Page',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### News Component
A structured article card layout featuring a hyperlinked headline, localized publication timestamp, and main body text content.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', name: 'Title' },
    date: { control: 'text', name: 'Date' },
    dateText: { control: 'text', name: 'Date Text' },
    content: { control: 'text', name: 'Content' },
  },
};

// 1. Default fallback state
export const DefaultView = {
  render: (args) => createNews({ news: args }),
};

const populatedNews = {
  title: 'Breaking Tech Innovation 2026',
  date: '2026-06-29',
  dateText: '29 June 2026',
  content: 'Discover how next-generation browser compilation changes component testing frameworks forever.',
};

// 2. Populated custom state
export const PopulatedView = {
  render: (args) => createNews({ news: { ...populatedNews, ...args } }),
};

const longTextNews = {
    title: 'An Exceptionally Long Headline That Might Cause Layout Wrapping Issues If Not Handled Properly By CSS Styles',
    date: '2026-01-01',
    dateText: '29 June 2026',
    content: 'This is a very long descriptive text block meant to stress test the container boundaries. It ensures that text formatting wraps beautifully across multiple lines without breaking the layout constraints of the news sector wrapper container.',
  }
// 3. Layout stress test state
export const LongTextStressTest = {
  render: (args) => createNews({ news: { ...longTextNews, ...args } }),
};
