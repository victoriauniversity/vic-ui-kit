export default {
  title: 'Components/PromoBlocks',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
Collection of promotional component blocks used for high-impact content link highlights, including the primary and secondary promo boxes and the standalone text panel callout.

### Requirements
- These components must reside within layout containers like \`.formatting\` or \`.centraliser\` to preserve template typesetting configurations.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', name: 'Title' },
    description: { control: 'text', name: 'Description (HTML supported)' },
    href: { control: 'text', name: 'Link destination (href)' },
  },
};

// 1. Primary Promo Box Block (aka Black Promo Box)
export const PrimaryPromoBox = {
  args: {
    title: 'Global and national engagement',
    description: 'We seek to bring the world to Victoria and Victoria to the world. <b>Find out more…</b>',
    href: 'https://wgtn.ac.nz',
  },
  render: (args) => `
    <div class="formatting">
      <article class="promo primary">
        <a href="${args.href}">
            <h2>${args.title}</h2>
            <p>${args.description}</p>
        </a>
      </article>
    </div>
  `,
};

// 2. Secondary Promo Box Variant Block
export const SecondaryPromoBox = {
  args: {
    title: 'Global and national engagement',
    description: 'We seek to bring the world to Victoria and Victoria to the world. <b>Find out more…</b>',
    href: 'https://wgtn.ac.nz',
  },
  render: (args) => `
    <div class="formatting">
      <div class="promo secondary">
          <a href="${args.href}">
              <h2>${args.title}</h2>
              <p>${args.description}</p>
          </a>
      </div>
    </div>
  `,
};

// 3. Horizontal Text Promo Panel Block
export const TextPromoPanel = {
  argTypes: {
    classState: { control: 'text', name: 'Modifier Class ({{{classState}}})' },
    buttonText: { control: 'text', name: 'Button Label' },
  },
  args: {
    title: 'Research matters',
    description: 'In the Faculty of Humanities and Social Sciences, we explore the fundamental questions that define human experience.',
    href: 'https://wgtn.ac.nz',
    classState: '',
    buttonText: 'Find out more',
  },
  render: (args) => `
    <div class="text-promo-panel ${args.classState}">
        <div class="block formatting centraliser">
            <div class="text-wrap">
                <h2>${args.title}</h2>
                <p>${args.description}</p>
            </div>
            <div class="button-wrap">
                <a href="${args.href}" title="${args.buttonText}" class="button primary large">${args.buttonText}</a>
            </div>
        </div>
    </div>
  `,
};
