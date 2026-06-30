import { createPhotoPromoPanel } from './PhotoPromoPanel';

export default {
  title: 'Features/Promos/Photo Promo Panel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Full Width Promo with Photo Background
A deep, full-bleed promotional framework designed for primary marketing sectors. Utilizes high-impact photography with layered layout overlays for key user action conversions.
        `,
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Primary section tier header text string.' },
    content: { control: 'text', description: 'Main narrative informational block text body.' },
    buttonText: { control: 'text', description: 'Label displayed inside the prominent action element.' },
    buttonUrl: { control: 'text', description: 'Navigation path destination value.' },
    img: { control: 'text', description: 'Visual photo asset path mapped onto the element background context.' },
  },
};

export const DefaultPhotoPanel = {
  args: {
    heading: 'Life on campus',
    content: 'Coming to Victoria is about more than just studying. Explore our campuses and find all you need to know about our facilities, food and drink, healthcare and banking, transport and how you can get involved in life on campus.',
    buttonText: 'Student life at Victoria',
    buttonUrl: '#',
    img: 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  },
  render: (args) => createPhotoPromoPanel(args),
};
