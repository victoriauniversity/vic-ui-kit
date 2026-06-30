/**
 * Creates a full-width promotional panel component with a decorative background pattern and action link buttons.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.heading - Section title heading.
 * @param {string} args.description - Structural descriptive paragraph text content.
 * @param {string} args.backgroundImage - Replaces 'xxx-img' attribute token string with an inline style or pattern handle variable.
 * @param {Array<Object>} args.links - An array of hyperlink data config blocks.
 * @returns {string} HTML string literal.
 */
export function createFullWidthPromoList({
  heading = 'Community, culture and support',
  description = 'Victoria is a welcoming place full of people from a diverse range of communities. There are all sorts of resources and support available to help you make the best of your time at wgtn.',
  backgroundImage = 'https://www.wgtn.ac.nz/__data/assets/image/0005/216698/maori-bg-pattern.png',
  links = []
} = {}) {
  // Map link configurations directly into flat style class button anchor strings
  const linksHtml = links.map(link => `
    <a class="button flat" href="${link.url || '#'}" title="${link.title || link.text}">${link.text}</a>
  `.trim()).join('\n                ');

  // Inject structural background pattern custom token matching original template variables if required
  const inlineStyle = backgroundImage ? ` style="background-image: url('${backgroundImage}');"` : '';

  return `
<div class="promo-panel pattern">
    <figure class="pattern"${inlineStyle}>
        <figcaption>
            <div class="block formatting">
                <h1>${heading}</h1>

                <p>${description}</p>

                <!-- TODO: Transform to list of links -->
                <p>
                    ${linksHtml || '<!-- No action links provided -->'}
                </p>
            </div>
        </figcaption>
    </figure>
</div>
  `.trim();
}
