import { createTilesPanel } from './Tiles';

export default {
  title: 'Components/Tiles Panel/Tiles',
  parameters: {
    docs: {
      description: {
        component: `
### Description
A flexible, unified grid layout used to display structural course choices, degree categories, internal paths, or external hub links.

### All Handled Layout Variations:
1. **Default Grid Layout**: Standard ribbon strip view.
2. **Four Column Sub-text**: Intermediate labels nested into a tight layout frame.
3. **Fixed Height Sub-text**: Standard 4-column item view using specific header icons.
4. **Three Column Dynamic Height Hub**: Top-level utility hub block with expanded description text blocks and customized arrow containers.
5. **Three Column Hub with External Images**: Feature layouts equipped with top-header graphics and call-to-action link banners.
        `,
      },
    },
  },
  argTypes: {
    gridModifier: { control: 'text', description: 'CSS classes applied directly to the inner grid wrapper.' },
    wrapModifier: { control: 'text', description: 'CSS classes applied to the immediate list layout context.' },
    tiles: { control: 'object', description: 'Array framework containing data configurations for all generated cards.' },
  },
  args: {
    gridModifier: 'tile-strip-grid updated-tile-grid',
    wrapModifier: '',
    tiles: [
      { title: 'Bachelor of Engineering with Honours', subtitle: 'BE(Hons)', meta: '3 years', url: '' },
      { title: 'Bachelor of Engineering with Honours', subtitle: 'BE(Hons)', meta: '3 years', url: '' },
      { title: 'Bachelor of Engineering with Honours', subtitle: 'BE(Hons)', meta: 'FOH', url: '' },
      { title: 'Bachelor of Engineering with Honours', subtitle: 'BE(Hons)', meta: 'FHSS', url: '' },
      { title: 'Bachelor of Engineering with Honours', subtitle: 'BE(Hons)', meta: 'Law', url: '' },
    ],
  },
  render: (args) => createTilesPanel(args),
};

export const Default = {};

export const FourColumnSubText = {
  args: {
    gridModifier: 'updated-tile-grid',
    wrapModifier: 'four-col',
    tiles: Array(7).fill({
      title: 'Master of Museum and Heritage Practice',
      subtitle: 'MMHP',
      useSubTextWrapper: true,
      url: ''
    })
  }
};

export const FixedHeightSubTextWithIcons = {
  args: {
    gridModifier: 'updated-tile-grid fixed-height-tiles',
    wrapModifier: 'four-col',
    tiles: Array(5).fill({
      title: 'Anthropology',
      subtitle: 'Subjects',
      subtitleIcon: 'icon-book',
      description: 'Cultural Anthropology',
      useSubTextWrapper: true,
      url: ''
    })
  }
};

export const ThreeColumnHubDynamicHeight = {
  parameters: {
    docs: { description: { story: 'Three column tile layout for hub top level pages.' } },
  },
  args: {
    gridModifier: 'updated-tile-grid dynamic-height-tiles',
    wrapModifier: 'three-col',
    tiles: [
      {
        title: 'Course planning appointments',
        description: 'If you need help deciding what degree might be right for you, or what courses to take, book a course planning session with us.',
        useSubTextWrapper: true,
        actionType: 'custom-icon-block',
        url: ''
      },
      {
        title: 'Book a campus tour',
        description: 'Get a taste of what life at Victoria is like—book a campus tour and check out our student accommodation while you are here.',
        useSubTextWrapper: true,
        actionType: 'custom-icon-block',
        url: ''
      },
      {
        title: 'School visits',
        description: "We're visiting schools throughout the year. For your introduction to Victoria, find out when we're in your region.",
        useSubTextWrapper: true,
        actionType: 'custom-icon-block',
        url: ''
      }
    ]
  }
};

export const ThreeColumnHubWithExternalImages = {
  parameters: {
    docs: { description: { story: 'Three column tile layout with images, for hub top level pages. To be used for linking to external related sites.' } },
  },
  args: {
    gridModifier: 'updated-tile-grid',
    wrapModifier: 'three-col image-no-gutter',
    tiles: [
      {
        headerTag: 'h3',
        title: 'Faculty of graduate research',
        description: 'We oversee all doctoral degrees and work to ensure that your experience as a thesis student is a positive one.<br><br>We administer the registration, enrolment, support and funding elements of your study.',
        useSubTextWrapper: true,
        imageSrc: 'https://www.wgtn.ac.nz/__data/assets/image/0008/358388/mim-banner.jpg',
        imageAlt: 'Faculty description graphic',
        actionType: 'button',
        actionText: 'Learn more',
        url: '#'
      },
      {
        headerTag: 'h3',
        title: 'Research office',
        description: 'The Research office supports the research culture at Victoria through promoting funding initiatives, managing ethics, professional development.<br><br>We also manage PBRF and support commercialisation and intellectual property licences.',
        useSubTextWrapper: true,
        imageSrc: 'https://www.wgtn.ac.nz/__data/assets/image/0008/358388/mim-banner.jpg',
        imageAlt: 'Office overview schematic',
        actionType: 'button',
        actionText: 'Learn more',
        url: '#'
      },
      {
        headerTag: 'h3',
        title: 'VicLink',
        description: 'The commercialisation arm of Victoria research, VicLink have the skills and connections to deliver your research into the market place.<br><br>We assist researchers to transform their discoveries into assets that have real benefit to society.',
        useSubTextWrapper: true,
        imageSrc: 'https://www.wgtn.ac.nz/__data/assets/image/0008/358388/mim-banner.jpg',
        imageAlt: 'VicLink link hub visual',
        actionType: 'button',
        actionText: 'Learn more',
        url: '#'
      }
    ]
  }
};
