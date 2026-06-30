/**
 * Creates a full-width promotional panel component with a full-bleed photo background.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.heading - Main headline block text string.
 * @param {string} args.content - Central layout summary paragraph.
 * @param {string} args.buttonText - Call-to-action text label.
 * @param {string} args.buttonUrl - Target hyperlink navigation path.
 * @param {string} args.img - Source URL for the background photograph.
 * @returns {string} HTML string literal.
 */
export function createPhotoPromoPanel({
  heading = 'Life on campus',
  content = 'Coming to Victoria is about more than just studying. Explore our campuses and find all you need to know about our facilities, food and drink, healthcare and banking, transport and how you can get involved in life on campus.',
  buttonText = 'Student life at Victoria',
  buttonUrl = '#',
  img = 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg'
} = {}) {
  return `
    <div class="promo-panel">
      <figure class="photo">
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
