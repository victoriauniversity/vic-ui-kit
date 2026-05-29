/**
 * Generates a unified HTML layout for all Tiles Panel variants.
 * Handles diverse grid layouts, image assets, conditional footer structures, and variable headings.
 */
export function createTilesPanel({ 
  gridModifier = 'tile-strip-grid updated-tile-grid', 
  wrapModifier = '', 
  tiles = [] 
} = {}) {
  
  const tileItems = tiles
    .map((tile) => {
      // 1. Render Top Image if it exists
      const imageHtml = tile.imageSrc 
        ? `<img src="${tile.imageSrc}" alt="${tile.imageAlt || ''}">` 
        : '';

      // 2. Select Header Type (H2 default vs H3)
      const HeaderTag = tile.headerTag || 'h2';
      const headingHtml = `<${HeaderTag}>${tile.title || ''}</${HeaderTag}>`;

      // 3. Render Inner Content/Sub-text Layout Block
      let contentHtml = '';
      if (tile.useSubTextWrapper) {
        const subtitleIconAttr = tile.subtitleIcon ? ` class="${tile.subtitleIcon}"` : '';
        const subtitleHtml = tile.subtitle ? `<h4${subtitleIconAttr}>${tile.subtitle}</h4>` : '';
        const descHtml = tile.description ? `<p>${tile.description}</p>` : '';
        
        contentHtml = `
              <div class="sub-text">
                ${subtitleHtml}
                ${descHtml}
              </div>`;
      } else {
        const subtitleHtml = tile.subtitle ? `<h4>${tile.subtitle}</h4>` : '';
        const metaHtml = tile.meta ? `<h4>${tile.meta}</h4>` : '';
        
        contentHtml = `
              ${subtitleHtml}
              ${metaHtml}`;
      }

      // 4. Select Action Indicator (Simple Arrow vs Span Button vs Custom Icon Block)
      let actionIndicatorHtml = '<i class="icon-arrow-right"></i>';
      if (tile.actionType === 'button') {
        actionIndicatorHtml = `<span class="button">${tile.actionText || 'Learn more'}</span>`;
      } else if (tile.actionType === 'custom-icon-block') {
        actionIndicatorHtml = `
              <span class="tile-icon">
                <span class="tile-icon-title"></span>
                <span>
                  <i class="icon-arrow-right"></i>
                </span>
              </span>`;
      }

      return `
          <li class="tile">
            ${imageHtml}
            <a href="${tile.url || ''}">
              ${headingHtml}${contentHtml}
              ${actionIndicatorHtml}
            </a>
          </li>`;
    })
    .join('');

  return `
<div class="tiles-panel">
  <div class="centraliser block">
    <div class="${gridModifier}">
      <div class="tiles-wrap ${wrapModifier}">
        <ul>${tileItems}
        </ul>
      </div>
    </div>
  </div>
</div>
  `;
}
