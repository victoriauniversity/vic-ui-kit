export default {
  title: 'Components/CardStack/DefaultStack',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
Card stack is used when you have vertically stacked, full width cards. They have a few structural variants based on configuration modifiers.

### Requirements
- Expects global icon assets (e.g., \`icon-calendar\`, \`icon-mail\`, \`icon-phone\`, \`icon-pin\`) to render metadata headers properly.
        `,
      },
    },
  },
  argTypes: {
    classModifier: { control: 'text', name: 'Class Modifier' },
    title: { control: 'text', name: 'Title' },
    url: { control: 'text', name: 'Subtitle URL' },
    filetype: { control: 'text', name: 'File Type Label' },
    intro: { control: 'text', name: 'Intro Text' },
    innerHtml: { control: 'text', name: 'Card Body Content (HTML)' },
    links: { control: 'text', name: 'Footer Links (Comma Separated)' },
    image: { control: 'text', name: 'Image Source URL' },
    code: { control: 'text', name: 'Course Code' },
    year: { control: 'text', name: 'Year' },
    startDate: { control: 'text', name: 'Start Date' },
    trimesters: { control: 'text', name: 'Trimesters (Comma Separated)' },
    meta: { control: 'boolean', name: 'Show Contact Details' },
    email: { control: 'text', name: 'Contact Email Prefix' },
  },
};

// Reusable template literal helper function imitating the Handlebars template structure
const renderCardStack = (args) => {
  // 1. Conditional Figure Image Component Block
  const imageBlock = args.image 
    ? `
      <figure class="c-stack-fig">
          <img class="c-stack-fig--image" src="${args.image}" alt="${args.title}">
      </figure>
    ` 
    : '';

  // 2. Conditional Panel Component Block (Course/Code layout)
  let panelBlock = '';
  if (args.code) {
    const yearSpan = args.year ? `<span>(${args.year})</span>` : '';
    
    let dateInfo = '';
    if (args.startDate) {
      dateInfo = `<p><i class="icon-calendar"></i> <em>${args.startDate}</em></p>`;
    } else if (!args.trimesters && args.year) {
      dateInfo = `<p><i class="icon-attention"></i> <em>Course not offered in ${args.year}</em></p>`;
    }

    let trimesterBlock = '';
    if (args.trimesters) {
      const trimList = args.trimesters.split(',').map(t => `
        <li>
            <a class="c-stack-figLink" href="#trimLink">${t.trim()}</a>
        </li>
      `).join('');
      
      trimesterBlock = `
        <h5>Trimester</h5>
        <ul class="c-stack-figlist">
            ${trimList}
        </ul>
      `;
    }

    panelBlock = `
      <div class="c-stack-fig c-stack-fig--panel">
          <h4 class="c-stack-code">${args.code} ${yearSpan}</h4>
          <div class="c-stack-figcaption">
              ${dateInfo}
              ${trimesterBlock}
          </div>
      </div>
    `;
  }

  // 3. Main Title Block Setup
  let titleBlock = '';
  if (args.title) {
    let urlBlock = '';
    if (args.url) {
      const fileBadge = args.filetype 
        ? `<span class="label label-- file-pdf"><i>${args.filetype}</i><span> 1286460KB</span></span>` 
        : '';
      urlBlock = `<small>${args.url} ${fileBadge}</small>`;
    }

    titleBlock = `
      <h4 class="c-stack-title">
          <a class="c-stack-link" href="#mainLink">${args.title}</a>
          ${urlBlock}
      </h4>
    `;
  }

  // 4. Foot Meta Details Loop
  let metaBlock = '';
  if (args.meta) {
    metaBlock = `
      <ul class="meta">
          <li class="highlight">
              <a href="mailto:${args.email || 'ina.reichenberger'}@vuw.ac.nz" title="Send an email">
                  <i class="icon-mail"></i> ${args.email || 'ina.reichenberger'}@vuw.ac.nz
              </a>
          </li>
          <li class="highlight">
              <a href="tel:04 4635375" title="Call work phone">
                  <i class="icon-phone"></i> 04 4635375
              </a>
          </li>
          <li>
              <i class="icon-pin"></i> Room 917, Rutherford House 23 Lambton Quay
          </li>
      </ul>
    `;
  }

  // 5. Foot Text Links Loop
  let linksBlock = '';
  if (args.links) {
    const splitLinks = args.links.split(',').map(link => `
      <li><a href="#footLink">${link.trim()}</a></li>
    `).join('');
    linksBlock = `<ul class="links">${splitLinks}</ul>`;
  }

  // Assemble full semantic framework structure string
  return `
    <div class="c-stack ${args.classModifier || ''}">
        ${imageBlock}
        ${panelBlock}

        <div class="c-stack-info">
            ${titleBlock}
            ${args.intro ? `<p class="c-stack-intro">${args.intro}</p>` : ''}

            <div class="c-stack-body">
                ${args.innerHtml || ''}
            </div>

            <div class="c-stack-foot">
                ${metaBlock}
                ${linksBlock}
            </div>
        </div>
    </div>
  `;
};

// --- Stories ---

// 1. Default Stack Card Pattern (As provided in your inner content example specification)
export const DefaultStackedCard = {
  args: {
    classModifier: '',
    title: 'Default Card in Stack',
    url: 'https://www.wgtn.ac.nz/explore/study-areas/software-and-computer-science',
    intro: 'Study Software Engineering and Computer Science and be at the forefront of the information revolution.',
    innerHtml: '<p>Study Software Engineering and Computer Science and be at the forefront of the information revolution. ... Find out what it’s like to study Software and Computer Science at Victoria from two students and a lecturer.</p>',
    links: 'Study options | Software and Computer Science, People | Software and Computer Science',
    meta: false,
  },
  render: (args) => renderCardStack(args),
};

// 2. Course Details Card Block Variant
export const CourseCodeVariant = {
  args: {
    classModifier: '',
    title: 'Advanced Software Engineering',
    code: 'SWEN 301',
    year: '2026',
    trimesters: 'Trimester 1, Trimester 2',
    intro: 'Core techniques and infrastructure workflows for contemporary systems deployment.',
    innerHtml: '<p>This course addresses advanced components of structural analysis, requirements engineering, and automated testing frameworks inside standard web sandboxes.</p>',
    meta: false,
  },
  render: (args) => renderCardStack(args),
};

// 3. Profile Card Block with Image Asset & Meta Loops
export const ProfileContactVariant = {
  args: {
    classModifier: 'c-stack--profile',
    title: 'Dr Ina Reichenberger',
    image: 'https://placehold.co',
    intro: 'Senior Lecturer - Tourism Management / School of Management',
    innerHtml: '<p>Ina joined the School of Management in 2017, focusing on structural user coordination, community integration rules, and interactive framework applications.</p>',
    meta: true,
    email: 'ina.reichenberger',
  },
  render: (args) => renderCardStack(args),
};

// 4. Staff Profile Stack Card Pattern (As provided in your latest template specification)
export const StaffProfileCard = {
  args: {
    classModifier: 'c-stack-flexin c-stack-profile',
    title: 'Dr Ina Reichenberger',
    image: 'https://www.wgtn.ac.nz/images/staffpics/nopicture.gif',
    meta: true,
    email: 'ina.reichenberger',
    intro: '', // Left empty to match the template payload definition
    innerHtml: `
      <header class="formatting">
          <p class="subtitle">
              <strong>Lecturer</strong> <span>School of Management</span>
          </p>
      </header>
    `,
    links: '', // Disables bottom anchor link arrays for profile layouts
  },
  render: (args) => renderCardStack(args),
};

// 5. Programme Meta Stack Card Pattern (Featuring the left side panel bleed layout)
export const ProgrammeMetaCard = {
  args: {
    classModifier: 'c-stack-flexin',
    title: 'Meta Card in Stack',
    url: 'https://www.wgtn.ac.nz/explore/degrees/science/overview',
    code: 'GCertCom',
    startDate: 'Next start date 11 Nov 2019',
    intro: 'Follow your passion, develop problem-solving skills, and dive into a fascinating career with a Bachelor of Science.',
    innerHtml: `
      <ul class="meta meta--labelled">
          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-graduation-cap"></i> <span class="meta-labelText">Level of Study</span></h5>
              <p class="meta-data"><strong>Undergraduate</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-clock"></i> <span class="meta-labelText">Length of full-time study</span></h5>
              <p class="meta-data"><strong>3 years (360 points)</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-pin"></i> <span class="meta-labelText">Location</span></h5>
              <p class="meta-data"><strong>Kelburn, Wellington</strong></p>
          </li>
      </ul>
    `,
    meta: false,
    links: '',
  },
  render: (args) => renderCardStack(args),
};

// 5. Programme Meta Stack Card Pattern (Featuring the left side panel bleed layout)
export const CourseStack = {
  args: {
    classModifier: "c-stack-flexin",
    title: "Meta Card in Stack",
    url: "https://www.wgtn.ac.nz/explore/degrees/science/overview",
    code: "GISC401",
    year: "2018",
    trimesters: "1,3",
    innerHtml: `
      <p>Study Software Engineering and Computer Science and be at the forefront of the information revolution. ... Find out what it’s like to study Software and Computer Science at Victoria from two students and a lecturer.</p>

      <ul class="meta meta--labelled">
          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-graduation-cap"></i> <span class="meta-labelText">Points</span></h5>
              <p class="meta-data"><strong>20 points</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-clock"></i> <span class="meta-labelText">Duration</span></h5>
              <p class="meta-data"><strong>1 trimester</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-user"></i> <span class="meta-labelText">Coordinator</span></h5>
              <p class="meta-data"><strong>Jeffery Shima</strong></p>
          </li>
      </ul>
    `,
    meta: false,
    links: '',
  },
  render: (args) => renderCardStack(args),
};

export const ScholarshipStack = {
  args: {
    title: "Datacom Systems Scholarship in Computer Science",
    url: "https://www.wgtn.ac.nz/scholarships/current/datacom-systems-scholarship-in-computer-science",
    innerHtml: `
      <p>This Scholarship has been sponsored by Datacom Systems who initially established the scholarship for a period of five years, until 2002, and have...</p>

      <ul class="meta meta--labelled meta--grid">
          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-calendar"></i> <span class="meta-labelText">Closing</span></h5>
              <p class="meta-data"><strong>1 November 2019</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-people"></i> <span class="meta-labelText">Category</span></h5>
              <p class="meta-data"><strong>Māori students; Pasifika students; Students facing financial hardship</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-graduation-cap"></i> <span class="meta-labelText">Level</span></h5>
              <p class="meta-data"><strong>School leaver / 1st year</strong></p>
          </li>

          <li class="highlight meta-item">
              <h5 class="meta-label"><i aria-hidden="true" class="icon-book"></i> <span class="meta-labelText">Study Areas</span></h5>
              <p class="meta-data"><strong>Music</strong></p>
          </li>
      </ul>
    `,
    meta: false,
    links: '',
  },
  render: (args) => renderCardStack(args),
};



