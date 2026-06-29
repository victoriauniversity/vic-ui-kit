/**
 * Creates a semantic HTML markup block for an individual promo card item.
 * @param {Object} item - Configuration options for the item.
 * @returns {string} HTML string literal.
 */
function createPromoCard(item = {}) {
  return `
    <figure>
      <a href="${item.href || '#'}">
        <img src="${item.img || ''}" alt="">
      </a>
      <figcaption>
        <h3>${item.title || 'Default Title'}</h3>
        <p>${item.content || 'Default content paragraph text.'}</p>
      </figcaption>
    </figure>
  `;
}

/**
 * Creates a 3-column promotional grid block container.
 * @param {Object} args - Controls provided via Storybook Args.
 * @param {string} args.heading - Section heading title.
 * @param {Array<Object>} args.items - Array of promo item configurations.
 * @returns {string} HTML string literal.
 */
export function createPromoGrid({ heading, items = [] }) {
  const gridItemsHtml = items.map(item => createPromoCard(item)).join('\n');

  return `
    <div class="centraliser">
      <div class="block formatting">
        <h2>${heading || 'Know your next move'}</h2>
        <section class="grid-flex col-3">
          ${gridItemsHtml || '<!-- No promo items provided -->'}
        </section>
      </div>
    </div>
  `;
}
