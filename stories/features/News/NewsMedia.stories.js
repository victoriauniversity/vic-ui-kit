import { createNewsMedia } from './NewsMedia';

export default {
  title: 'Features/News/News Media Page',
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
    url: { control: 'text', name: 'URL' },
    media: { control: 'text', name: 'Media' },
  },
};

// 1. Default fallback state
export const DefaultView = {
  render: (args) => createNewsMedia({ news: args }),
};

const populatedVideoNews = {
    title: '‘Must see’ show inspired by family history',
    dateISO: '2016-08-30',
    dateText: '30 August 2016',
    content: 'Sitting in on a History lecture in 2014 on the Spanish Influenza, Victoria University Pacific Studies Honours graduate Tupe Lualua would never have imagined the path it was about to set her on.',
    url: '#',
    media: {
        type: 'video',
        src: 'https://www.youtube.com/embed/6nD-kAsV-rk?rel=0'
    }
}

// Option 1: Video Embed Layout
export const VideoMedia = {
  render: (args) => {
    return `
        <ul class="news">
            <li>
                ${createNewsMedia({ news: { ...populatedVideoNews, ...args } })}
            </li>
        </ul>
    `
  }
};

const populatedPortraitImageNews = {
    title: 'Architecture student heading to Italy to build his winning treehouse design.',
    dateISO: '2016-08-12',
    dateText: '12 August 2016',
    content: 'Victoria Architecture student Jacob Dench has won an international treehouse design competition and is heading to Italy at the end of August to build it.',
    url: 'http://cms.wgtn.ac.nz/fad/about/news/news-archives/2016-news/architecture-student-heading-to-italy-to-build-his-winning-treehouse-design.',
    media: {
        type: 'image',
        isPortrait: true,
        title: 'Octavia treehouse 2.jpg',
        src: 'http://cms.wgtn.ac.nz/__data/assets/image/0010/369325/Octavia-treehouse-2.jpg',
        alt: ''
    }
}

// Option 2: Portrait Image Layout
export const PortraitImageMedia = {
  render: (args) => {
    return `
        <ul class="news">
            <li>
                ${createNewsMedia({ news: { ...populatedPortraitImageNews, ...args } })}
            </li>
        </ul>
    `
  }
};

const populatedLandscapeImageNews = {
    title: 'Victoria University health researchers honoured',
    dateISO: '2016-08-23',
    dateText: '23 August 2016',
    content: 'Two Victoria University of Wellington researchers have been recognised by the Health Research Council of New Zealand (HRC) for their work into understanding social issues of health and wellbeing.',
    url: '#',
    media: {
        type: 'image',
        isPortrait: false,
        title: '',
        src: 'https://www.wgtn.ac.nz/__data/assets/image/0004/370948/ls_medium.jpg',
        alt: 'Victoria health researchers Professor Kevin Dew and Dr Kirsten Smiler'
    }
}

// Option 3: Landscape Image Layout
export const LandscapeImageMedia = {
    render: (args) => {
    return `
        <ul class="news">
            <li>
                ${createNewsMedia({ news: { ...populatedLandscapeImageNews, ...args } })}
            </li>
        </ul>
    `
  }
};