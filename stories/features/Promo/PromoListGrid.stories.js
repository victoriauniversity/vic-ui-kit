import { createPromoListGrid } from './PromoListGrid';

export default {
  title: 'Features/Promos/Promo List Grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### 1/3 Column Promo with List Underneath
[TA] - 1/3 Column Promo with List Underneath framework card module block.
Ref Link: WIP-1680
        `,
      },
    },
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'The grid container tier entry level title layout selector string.',
    },
    columns: {
      control: 'object',
      description: 'Nested tree model supplying layout graphics matching sublist metadata structural arrays.',
    },
  },
};

const mockPromoListGridData = [
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0011/343874/varieties/ls_small.jpg',
    listTitle: 'Sport and outdoors',
    listItems: [
      { text: 'Biking in Wellington', url: '#' },
      { text: 'Meet native wildlife', url: '#' },
      { text: 'Stunning views of Wellington', url: '#' },
      { text: 'Sports in the capital', url: '#' },
      { text: 'Outdoor, recreation, sports and parks', url: '#' }
    ]
  },
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0016/344032/varieties/ls_small.jpg',
    listTitle: 'Eating and drinking',
    listItems: [
      { text: 'Top notch brunch spots', url: '#' },
      { text: 'Cheap eats to fine dining', url: '#' },
      { text: 'Coffee capital', url: '#' },
      { text: 'Craft beer capital', url: '#' },
      { text: 'Wellington city markets', url: '#' }
    ]
  },
  {
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0010/343873/varieties/ls_small.jpg',
    listTitle: 'Culture central',
    listItems: [
      { text: 'Great gigs and cool concerts', url: '#' },
      { text: 'Get your fill of festivals', url: '#' },
      { text: 'Discover Māori culture', url: '#' },
      { text: 'Must see exhibits at Te Papa', url: '#' },
      { text: 'Middle of Middle Earth', url: '#' }
    ]
  }
];

export const DefaultGrid = {
  args: {
    heading: 'Discover Wellington',
    columns: mockPromoListGridData,
  },
  render: (args) => createPromoListGrid(args),
};

