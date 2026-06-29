import { createPagination } from './Pagination.js';

export default {
  title: 'Components/Navigation/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
A pagination navigation element used to split large data sets across multiple pages.

### Requirements
- Displays 'Previous' and 'Next' navigation links.
- Implements an ellipsis separator (\`...\`) for hidden leading or trailing page ranges.
- Shows exactly two prior pages and two next pages relative to the current active page.
        `,
      },
    },
  },
  argTypes: {
    currentPage: { control: 'number', description: 'The currently active page number.' },
    totalPages: { control: 'number', description: 'Total number of available pages.' },
    baseUrl: { control: 'text', description: 'Base URL for constructing page links.' },
  },
  args: {
    currentPage: 11,
    totalPages: 20,
    baseUrl: 'http://wgtn.ac.nz',
  },
  render: (args) => createPagination(args),
};

export const Default = {};

export const StartOfRange = {
  args: {
    currentPage: 1,
    totalPages: 15,
  },
};

export const EndOfRange = {
  args: {
    currentPage: 15,
    totalPages: 15,
  },
};
