/**
 * Creates an individual panel card for the twin layout grid configuration.
 * @param {Object} panel - Configuration options for a single panel.
 * @returns {string} HTML string literal.
 */
function createPromoSubPanel(panel = {}) {
  const imageHtml = panel.img 
    ? `<img alt="${panel.imgAlt || ''}" src="${panel.img}">` 
    : '';

  return `
    <figure class=" ">
      ${imageHtml}
      <figcaption>
        <h2>${panel.heading || 'Default Heading'}</h2>
        <p>${panel.content || 'Default content block description text.'}</p>
        ${panel.buttonText ? `
          <a href="${panel.buttonUrl || '#'}" title="${panel.buttonTitle || panel.buttonText}" class="button large flat-border">
            ${panel.buttonText}
          </a>
        ` : ''}
      </figcaption>
    </figure>
  `;
}

/**
 * Creates a container layout hosting two side-by-side promotional option panels.
 * @param {Object} args - Controls provided via Storybook Args.
 * @param {Array<Object>} args.panels - Array containing exactly two panel configurations.
 * @returns {string} HTML string literal.
 */
export function createTwoPanelsPromo({ panels = [] } = {}) {
  const panelsHtml = panels.map(panel => createPromoSubPanel(panel)).join('\n');

  return `
  <!-- Promo Panel - two panels -->
  <div class="promo-panel two-panels">
    <div class="block formatting centraliser">
      ${panelsHtml || '<!-- No panels data configurations provided -->'}
    </div>
  </div>
  `;
}
