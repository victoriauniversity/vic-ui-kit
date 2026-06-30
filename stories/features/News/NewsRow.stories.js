import { createNewsRow, createNewsRowMedia } from './NewsRow';


export default {
  title: 'Features/News/News Row',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### News Row Grid
News three column row, for use on hub top level pages. Features a section header layout with an escape-hatch 'More news' link anchor tag.
        `,
      },
    },
  },
};

// Mock data matching your converted HTML snippet
const mockNewsData = [
  {
    title: 'Maurice Goldsmith Lecture: Aesthetic Responsibility',
    dateISO: '2016-09-14',
    dateText: '14 September 2016',
    content: "The attitudes and judgments we make of artists based on their artworks were discussed at this year's Maurice Goldsmith Public Lecture by a top visiting philosophy scholar from the United States. Susan Wolf is the Edna J. Koury Distinguished Professor at the University of North Carolina."
  },
  {
    title: 'Maurice Goldsmith Lecture: Aesthetic Responsibility',
    dateISO: '2016-09-14',
    dateText: '14 September 2016',
    content: "The attitudes and judgments we make of artists based on their artworks were discussed at this year's Maurice Goldsmith Public Lecture by a top visiting philosophy scholar from the United States. Susan Wolf is the Edna J. Koury Distinguished Professor at the University of North Carolina."
  },
  {
    title: 'Applications now open for Summer Research Scholarships',
    dateISO: '2016-09-01',
    dateText: '1 September 2016',
    content: 'Applications are now invited from students for Faculty of Humanities and Social Sciences and Faculty of Education Summer Scholarships for 2016-17. Students can access information about the projects, and the online application form, by going to the FHSS Summer Scholars Scheme webpage.'
  }
];

export const DefaultRow = {
  render: () => createNewsRow({
    title: 'Research news',
    moreLinkUrl: '#',
    moreLinkLabel: 'More news',
    newsItems: mockNewsData
  }),
};

export const MixedMediaRow = {
  render: () => createNewsRowMedia({
    title: 'Featured Media Row',
    moreLinkUrl: '#',
    moreLinkLabel: 'View all media',
    newsItems: [
      {
        title: '‘Must see’ show inspired by family history',
        dateISO: '2016-08-30',
        dateText: '30 August 2016',
        content: 'Sitting in on a History lecture in 2014 on the Spanish Influenza, Victoria University Pacific Studies Honours graduate Tupe Lualua would never have imagined the path it was about to set her on.',
        media: {
          type: 'image',
          isPortrait: true,
          title: 'Octavia treehouse 2.jpg',
          src: 'http://cms.wgtn.ac.nz/__data/assets/image/0010/369325/Octavia-treehouse-2.jpg',
          alt: ''
        }
      },
      {
        title: 'Architecture student heading to Italy to build his winning treehouse design.',
        dateISO: '2016-08-12',
        dateText: '12 August 2016',
        content: 'Victoria Architecture student Jacob Dench has won an international treehouse design competition and is heading to Italy at the end of August to build it.',
        media: {
          type: 'image',
          isPortrait: true,
          title: 'Octavia treehouse 2.jpg',
          src: 'http://cms.wgtn.ac.nz/__data/assets/image/0010/369325/Octavia-treehouse-2.jpg',
          alt: ''
        }
      },
      {
        title: 'Victoria University health researchers honoured',
        dateISO: '2016-08-23',
        dateText: '23 August 2016',
        content: 'Two Victoria University of Wellington researchers have been recognised by the Health Research Council of New Zealand (HRC) for their work into understanding social issues of health and wellbeing.',
        media: {
          type: 'image',
          isPortrait: true,
          title: 'Octavia treehouse 2.jpg',
          src: 'http://cms.wgtn.ac.nz/__data/assets/image/0010/369325/Octavia-treehouse-2.jpg',
          alt: ''
        }
      }
    ]
  })
};

