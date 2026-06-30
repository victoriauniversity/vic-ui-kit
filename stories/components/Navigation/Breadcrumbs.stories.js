export default {
  title: 'Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
A breadcrumb navigation component that helps users understand their current location within the website hierarchy.

### Accessibility Notes
- Container includes \`aria-label="You are here:"\` and \`role="navigation"\` to announce its purpose to screen readers.
- The final list item represents the current page.
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'List of breadcrumb steps. The last item is treated as the current active page.',
    },
    className: {
      control: 'text',
      description: 'CSS classes applied to the main wrapper.',
    },
  },
  args: {
    className: 'breadcrumbs block',
    items: [
      { text: 'Faculty of Science', url: '#', title: 'Faculty of Science homepage' },
      { text: "From Master's to MetService: first-ever Master of Meteorology students graduate this week", url: '#', title: "Parent page 'Study and Careers'" },
      { text: 'Postgraduate Study', url: '#', title: "Parent page 'Postgraduate Study'" },
      { text: 'Master of Innovation and Commercialisation', url: '#', title: "Parent page 'Master of Innovation and Commercialisation'" },
      { text: 'Example of some extremely very long heading that will have to break', url: null, title: null }
    ],
  },
  render: (args) => {
    const listItems = args.items.map((item, index) => {
      const isLast = index === args.items.length - 1;
      
      if (isLast || !item.url) {
        return `<li>${item.text}</li>`;
      }
      
      const titleAttr = item.title ? `title="${item.title}"` : '';
      return `<li><a href="${item.url}" ${titleAttr}>${item.text}</a></li>`;
    }).join('\n      ');

    return `
  <nav aria-label="You are here:" role="navigation">
    <ul class="${args.className}">
      ${listItems}
    </ul>
  </nav>
    `;
  },
};

export const Default = {};

export const Short = {
  args: {
    items: [
      { text: 'Home', url: '#' },
      { text: 'Faculty of Science', url: '#' },
      { text: 'Current Page', url: null }
    ]
  }
};
