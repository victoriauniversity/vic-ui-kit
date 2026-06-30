/**
 * Creates a promo panel component featuring a left-aligned image with an overlaid title and adjacent description content block.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.img - The source URL for the target image asset.
 * @param {string} args.imgAlt - Alternate descriptive label text for the image tag.
 * @param {string} args.title - Overlay heading title rendered inside the figcaption block.
 * @param {Array<string>} args.paragraphs - An array of descriptive body paragraph text blocks.
 * @param {string} args.buttonText - Text content label displayed inside the action button.
 * @param {string} args.buttonUrl - Interactive target hyperlink URL address for the action button.
 * @param {string} args.buttonTitleText - Explicit accessibility tooltip string title for the anchor markup.
 * @returns {string} HTML string literal.
 */
export function createTitleImagePromo({
  img = 'https://www.wgtn.ac.nz/__data/assets/image/0008/760517/varieties/ls_large.jpeg',
  imgAlt = 'Wellington waterfront',
  title = 'What is a research degree?',
  paragraphs = [
    "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.",
    "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields. Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields."  ],
  buttonText = 'Learn more',
  buttonUrl = '#',
  buttonTitleText = 'Why to study at Victoria'
} = {}) {
  // Generate robust body paragraph block sequences dynamically
  const textBlocksHtml = paragraphs.map(text => `<p>${text}</p>`).join('\n');

  return `
    <!-- promo panel with left aligned title and image -->
    <div class="promo-panel title-image">
      <div class="block formatting centraliser">
        <figure class=" ">
          <img alt="${imgAlt}" src="${img}">
          <figcaption>
            <h3>${title}</h3>
          </figcaption>
        </figure>
        <section>
          ${textBlocksHtml || '<!-- No content paragraphs provided -->'}
          ${buttonText ? `
            <a title="${buttonTitleText}" href="${buttonUrl}" class="button large">
              ${buttonText}
            </a>
          ` : ''}
        </section>
      </div>
    </div>
  `;
}
