import { createPromoGrid } from './PromoGrid';

export default {
  title: 'Features/Promos/Promo Grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### 3-Column Promo Grid Component
[TA] - 3 column promo with image and text (+HP)(MVP)
Ref: WIP-2076
        `,
      },
    },
  },
  // Define default values and control types for the entire suite
  argTypes: {
    heading: {
      control: 'text',
      description: 'The main heading title of the promo grid component block.',
    },
    items: {
      control: 'object',
      description: 'An array containing configuration options for the interactive promo item objects.',
    },
  },
};

// Base mock content mapping configuration
const defaultPromoItems = [
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0011/366851/varieties/ls_small.jpg',
    href: '#',
    title: 'Course planning appointments',
    content: 'If you need help deciding what degree might be right for you, or what courses to take, book a course planning session with us.'
  },
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0004/373945/varieties/ls_small.jpg',
    href: '#',
    title: 'Book a campus tour',
    content: 'Get a taste of what life at Victoria is like—book a campus tour and check out our student accommodation while you are here.'
  },
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0010/294427/varieties/ls_small.jpg',
    href: '#',
    title: 'School visits',
    content: "We're visiting schools throughout the year. For your introduction to Victoria, find out when we're in your region."
  }
];

// 1. Default configured view mapping args directly into the rendering loop template
export const DefaultGrid = {
  args: {
    heading: 'Know your next move',
    items: defaultPromoItems,
  },
  render: (args) => createPromoGrid(args),
};

// 2. Secondary variant with modified properties to verify layout scalability
export const EmptyGrid = {
  args: {
    heading: 'Coming Soon: Global Student Sectors',
    items: [],
  },
  render: (args) => createPromoGrid(args),
};
