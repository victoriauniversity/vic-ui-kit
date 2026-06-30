/**
 * Creates an individual content panel card block configuration.
 * @param {Object} panel - Configuration properties for a panel.
 * @returns {string} HTML string literal.
 */
function createPanelCard(panel = {}) {
  // Generate optional image layout block if an image URL string is present
  const imageHtml = panel.img 
    ? `<img src="${panel.img}" alt="">` 
    : '';

  return `
    <figure>
      ${panel.imgRtl ? imageHtml : ''}
      <figcaption>
        <h1>${panel.heading || 'Default Panel Heading'}</h1>
        ${panel.content ? `<p>${panel.content}</p>` : ''}
        ${panel.linkLabel ? `
          <a title="${panel.linkTitle || panel.linkLabel}" href="${panel.linkUrl || '#'}" class="button large">
            ${panel.linkLabel}
          </a>
        ` : ''}
      </figcaption>
      ${!panel.imgRtl ? imageHtml : ''}
    </figure>
  `;
}

/**
 * Generates promo layout block variations (Split 2/3 1/3 or Full-width panel).
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @returns {string} HTML string literal.
 */
export function createPromoPanel({ isSplitLayout = false, imgRtl = false, panels = [] }) {
  const panelClasses = [
    'promo-panel',
    isSplitLayout ? 'two-one-third' : '',
  ].filter(Boolean).join(' ');

  const blocksHtml = panels.map(panel => createPanelCard(panel)).join('\n');

  return `
    <div class="${panelClasses}">
      <div class="centraliser block formatting">
        ${blocksHtml || '<!-- No panel data blocks provided -->'}
      </div>
    </div>
  `;
}
