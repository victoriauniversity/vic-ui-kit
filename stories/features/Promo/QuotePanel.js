/**
 * Creates a promotional quote panel module.
 * Wraps content in an anchor link element only if a destination URL is provided.
 * @param {Object} args - Configuration options mapping to Storybook controls.
 * @param {string} args.quoteText - The main citation string or statement layout.
 * @param {string} args.authorName - Name of the speaker or statistic reference.
 * @param {string} args.authorTitle - Title position or contextual credential text.
 * @param {string} args.url - Optional target navigation path url.
 * @returns {string} HTML string literal.
 */
export function createQuotePanel({
  quoteText = 'Our researchers are making a positive impact - on the lives and wellbeing of people - not just in New Zealand, but around the world - through exceptional innovation and research.',
  authorName = 'Professor Kate Mcgrath',
  authorTitle = 'Vice-Provost (Research)',
  url = '#'
} = {}) {
  // Construct inner figure semantic structure layout block
  const figureHtml = `
    <figure class="quote full">
      <blockquote>
        <h3>${quoteText}</h3>
      </blockquote>
      <figcaption>
        ${authorName}${authorTitle ? `<br>${authorTitle}` : ''}
      </figcaption>
    </figure>
  `.trim();

  // Conditionally wrap layout structure using an anchor tag if url exists
  const innerContentHtml = url 
    ? `<a href="${url}">${figureHtml}</a>` 
    : figureHtml;

  return `
<div class="quote-panel">
  <div class="centraliser">
    <div class="block">
      ${innerContentHtml}
    </div>
  </div>
</div>
  `.trim();
}
