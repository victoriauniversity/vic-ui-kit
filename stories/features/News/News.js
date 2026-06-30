/**
 * Creates a semantic HTML article markup block for a news item.
 * @param {Object} options - Configuration options.
 * @param {Object} options.news - The news data object.
 * @param {string} options.news.title - The headline of the news article.
 * @param {string} options.news.date - The ISO date string or formatted date string.
 * @param {string} options.news.content - The main body text paragraph.
 * @returns {string} HTML string literal.
 */
export function createNews({ news = {} } = {}) {
  return `
    <article>
      <div class="summary formatting">
        <h3>
          <a href="#">${news.title || 'Default News Title'}</a>
        </h3>
        <p>
          <time datetime="${news.date || '2016-09-14'}">
            ${news.dateText || '14 September 2016'}
          </time>
        </p>
        <p>${news.content || 'Default news content.'}</p>
      </div>
    </article>
  `;
}
