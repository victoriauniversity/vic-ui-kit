export default {
  title: 'Components/Tags',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Standard utility tags used for data filtering, tag clouds, status badges, and highlighting taxonomies.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'tag-green', 'tag-grey', 'tag-red', 'tag-yellow'],
      description: 'Color theme class modifier applied to the tag.',
    },
    isLink: { 
      control: 'boolean', 
      description: 'Wraps the tag inside an anchor element or converts the element to a link.' 
    },
    href: { control: 'text' },
  },
};

export const Playground = {
  args: {
    label: 'Interactive Tag',
    variant: 'default',
    isLink: false,
    href: '#',
  },
  render: (args) => {
    const colorClass = args.variant !== 'default' ? args.variant : '';
    const classes = ['tag', colorClass].filter(Boolean).join(' ');

    if (args.isLink) {
      return `<a href="${args.href}" class="${classes}">${args.label}</a>`;
    }
    return `<span class="${classes}">${args.label}</span>`;
  },
};

export const TagGroup = {
  render: () => `
    <div class="tags">
      <span class="tag">Tag group</span>
      <span class="tag">Tag group</span>
      <span class="tag">Tag group</span>
    </div>
  `,
};

export const ColorVariants = {
  render: () => `
    <span class="tag">Default</span>
    <span class="tag tag-green">Green</span>
    <span class="tag tag-grey">Grey</span>
    <span class="tag tag-red">Red</span>
    <span class="tag tag-yellow">Yellow</span>
  `,
};

export const LinkTags = {
  render: () => `
    <div>
      <!-- Inline Anchor Variant -->
      <a href="#" class="tag">Link tag</a>
      
      <!-- Nested Anchor Wrapper Variant -->
      <a href="#"><span class="tag tag-green">Link tag</span></a>
    </div>
  `,
};
