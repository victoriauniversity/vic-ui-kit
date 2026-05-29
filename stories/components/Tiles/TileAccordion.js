/**
 * Generates the HTML structure for the interactive Tile Accordion component.
 */
export function createTileAccordion({ tiles = [] } = {}) {
  const accordionItems = tiles
    .map((tile) => {
      const stateClass = tile.isOpen ? 'accordion-open' : 'accordion-closed';
      const contentClass = tile.isOpen ? '' : 'closed';
      const iconClass = tile.isOpen ? 'icon-caret-down' : 'icon-caret-right';

      const linkItems = (tile.links || [])
        .map((link) => `<li><a href="${link.url || '#'}">${link.text}</a></li>`)
        .join('\n                ');

      return `
          <li class="tile ${stateClass}">
            <a href="javascript:void(0)" class="accordion-trigger">
              <h2>${tile.title || ''}</h2>
              <h4>${tile.description || ''}</h4>
              <i class="${iconClass}"></i>
            </a>
            <div class="accordion-content ${contentClass} list">
              <ul class="links">
                ${linkItems}
              </ul>
            </div>
          </li>`;
    })
    .join('\n');

  return `
<div class="tiles-panel">
  <div class="centraliser block">
    <div class="tile-strip-grid tile-accordion">
      <div class="tiles-wrap">
        <ul class="accordion-list">
          ${accordionItems}
        </ul>
      </div>
    </div>
  </div>
</div>
  `;
}
