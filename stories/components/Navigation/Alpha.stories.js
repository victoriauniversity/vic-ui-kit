export default {
  title: 'Components/Navigation/Alphabetical Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
An alphabetical filtering navigation pattern used to jump directly to content starting with a specific letter.

### Accessibility Notes
- The \`<ul>\` list element includes \`role="navigation"\` to announce the interactive index landmark to assistive technologies.
        `,
      },
    },
  },
  argTypes: {
    letters: {
      control: 'object',
      description: 'Array of strings representing individual alphabetical steps.',
    },
    activeLetter: {
      control: 'text',
      description: 'The letter corresponding to the current active filter view.',
    },
  },
  args: {
    letters: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
      'U', 'V', 'W', 'Z'
    ],
    activeLetter: 'C',
  },
  render: (args) => {
    const listItems = args.letters
      .map((letter) => {
        const isActive = letter.toUpperCase() === args.activeLetter?.toUpperCase();
        const activeClass = isActive ? 'button--active' : ''; // Optional helper if an active class is used
        
        return `<li><a class="button primary no-icon ${activeClass}" href="#${letter}"><span>${letter}</span></a></li>`;
      })
      .join('\n        ');

    return `
  <!-- Pagination -->
  <nav class="pagination pagination--alpha">
    
      <ul class="pagination__list pages" role="navigation">
        ${listItems}
      </ul>

  </nav>
    `;
  },
};

export const Default = {};

export const SelectedLetter = {
  args: {
    activeLetter: 'M',
  },
};

export const CustomRange = {
  args: {
    letters: ['A', 'B', 'C', 'D', 'E'],
    activeLetter: 'A',
  },
};
