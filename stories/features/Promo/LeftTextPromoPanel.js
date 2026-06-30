/**
 * Creates a full-width promotional panel component with a full-bleed photo background and a left-aligned text overlay container.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.heading - Main title string inside the block.
 * @param {string} args.content - Central summary paragraph text copy.
 * @param {string} args.buttonText - Text label displayed inside the action button.
 * @param {string} args.buttonUrl - Target hyperlink URL for the action button link.
 * @param {string} args.img - Source URL path for the background photo asset.
 * @returns {string} HTML string literal.
 */
export function createLeftTextPromoPanel({
  heading = 'Research impacts',
  content = 'Victoria’s research output is used at community, national and international levels. Our academic and business partnerships provide global solutions in many fields.',
  buttonText = 'Learn more',
  buttonUrl = '#',
  img = 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg'
} = {}) {
  return `
    <div class="promo-panel">
        <figure class="photo left-text-panel">
            <img alt="${heading}" src="${img}">
            <figcaption>
                <div class="block formatting">
                    <h1>${heading}</h1>
                    <p>${content}</p>
                    <a href="${buttonUrl}" class="button primary large">${buttonText}</a>
                </div>
            </figcaption>
        </figure>
    </div>
  `.trim();
}
