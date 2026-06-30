/**
 * Creates a semantic HTML markup block for a Link List layout.
 * @param {Object} options - Configuration properties.
 * @returns {string} HTML string literal.
 */
function createLinksList({ title = 'Link list', items = [] } = {}) {
  const linksHtml = items.map(item => {
    if (item.url) {
      const externalClass = item.isExternal ? ' class="link-external"' : '';
      const restrictedClass = item.isRestricted ? ' class="link-restricted"' : '';
      const finalClass = externalClass || restrictedClass || '';
      
      return `
        <li>
          <a href="${item.url}" title="${item.title || item.text}"${finalClass}>${item.text}</a>
        </li>
      `;
    }
    return `<li><span>${item.text}</span></li>`;
  }).join('\n');

  return `
    <div class="list">
      <h2>${title}</h2>
      <ul class="links">
        ${linksHtml}
      </ul>
    </div>
  `;
}

/**
 * Creates an individual 1/3 column promo container holding a card visual and an interactive list underneath.
 */
function createPromoColumn(col = {}) {
  const listHtml = createLinksList({
    title: col.listTitle,
    items: col.listItems
  });

  return `
    <figure>
      <img src="${col.img || ''}" alt="">
      <figcaption>
        ${listHtml}
      </figcaption>
    </figure>
  `;
}

/**
 * Creates a 3-column promotional grid matching Jira task WIP-1680 definitions.
 * @param {Object} args - Controls provided via Storybook Args.
 * @returns {string} HTML string literal.
 */
export function createPromoListGrid({ heading = 'Discover Wellington', columns = [] } = {}) {
  const columnsHtml = columns.map(col => createPromoColumn(col)).join('\n');

  return `
    <div class="centraliser">
      <div class="block formatting">
        <h2>${heading}</h2>
        <section class="grid-flex col-3">
          ${columnsHtml || '<!-- No promo columns provided -->'}
        </section>
      </div>
    </div>
  `;
}
