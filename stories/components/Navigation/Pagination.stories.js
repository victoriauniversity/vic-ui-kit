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
  render: (args) => {
    const { currentPage, totalPages, baseUrl } = args;

    // Build URL helper
    const getPageUrl = (p) => `${baseUrl}&current_result_page=${p}`;

    // Determine bounds for showing two pages prior and two next
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Conditional controls for Previous button
    const hasPrev = currentPage > 1;
    const prevLink = hasPrev 
      ? `<a class="button primary no-icon previous" rel="prev" href="${getPageUrl(currentPage - 1)}" title="Previous page">Previous</a>` 
      : '';

    // Conditional controls for Next button
    const hasNext = currentPage < totalPages;
    const nextLink = hasNext 
      ? `<a class="button primary no-icon next" rel="next" href="${getPageUrl(currentPage + 1)}" title="Next page">Next</a>` 
      : '';

    // Leading ellipsis
    const leadingEllipsis = startPage > 1 
      ? '<span class="icon 3dot">...</span>\n      ' 
      : '';

    // Trailing ellipsis
    const trailingEllipsis = endPage < totalPages 
      ? '\n      <span class="icon 3dot">...</span>' 
      : '';

    // Generate numeric intermediate page buttons
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        pageButtons.push(`<span class="button primary no-icon active">${i}</span>`);
      } else {
        pageButtons.push(`<a class="button primary no-icon" href="${getPageUrl(i)}" title="${i} out of pages">${i}</a>`);
      }
    }
    const pagesHtml = pageButtons.join(' ');

    return `
  <nav class="pagination">
    ${prevLink}
    ${nextLink}
    <div class="pages">
      ${leadingEllipsis}${pagesHtml}${trailingEllipsis}
    </div>
  </nav>
    `;
  },
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
