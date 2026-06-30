/**
 * Creates a narrow strip banner promotional card with an image photo background layout.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.heading - Heading title string inside the block.
 * @param {string} args.content - Paragraph summary text copy.
 * @param {string} args.img - Target visual photograph URL string mapped onto the layout template context.
 * @returns {string} HTML string literal.
 */
export function createStripBanner({
  heading = 'Campus Developments',
  content = 'Discover upcoming infrastructure transformations across our central city environments and student research sectors.',
  img = 'https://www.wgtn.ac.nz/__data/assets/image/0009/929007/aerial_2000x800.jpg'
} = {}) {
  return `
    <div class="promo-panel strip-banner">
    <figure class="photo">
            <img alt="${heading}" src="${img}">
        <figcaption>
            <div>
            <div class="block formatting">
                <h1>${heading}</h1>
                <p>${content}</p>
            </div>
            <!-- <div class="block formatting"> -->
            <!-- </div> -->
            </div>
        </figcaption>
    </figure>
    </div>
  `.trim();
}
