import { createNews } from './News';
import { createNewsMedia } from './NewsMedia';

/**
 * Creates a three-column news row layout sector.
 * @param {Object} options - Configuration options.
 * @param {string} options.title - Section heading title.
 * @param {string} options.moreLinkUrl - Target URL for the read more link.
 * @param {string} options.moreLinkLabel - Text label for the read more link.
 * @param {Array<Object>} options.newsItems - Array of news item configurations passed to createNews.
 * @returns {string} HTML string literal.
 */
export function createNewsRow({
  title = 'Research news',
  moreLinkUrl = '#',
  moreLinkLabel = 'More news',
  newsItems = []
} = {}) {
  // Generate items or fallback to empty array string mapping
  const itemsHtml = newsItems.map(item => createNews({ news: item })).join('\n');

  return `
    <section class="centraliser">
      <div class="block news-row">
        <header>
          <a href="${moreLinkUrl}" title="" class="link-more">${moreLinkLabel}</a>
          <h2>${title}</h2>
        </header>
        <ul class="news">
          ${itemsHtml || '<!-- No news items provided -->'}
        </ul>
      </div>
    </section>
  `;
}

export function createNewsRowMedia({
    title = 'Research news',
    moreLinkUrl = '#',
    moreLinkLabel = 'More news',
    newsItems = []
} = {}) {
    const itemsMediaHtml = newsItems.map(item => createNewsMedia({ news: item })).join('\n');
  return `
    <section class="centraliser">
      <div class="block news-row">
        <header>
          <a href="${moreLinkUrl}" title="" class="link-more">${moreLinkLabel}</a>
          <h2>${title}</h2>
        </header>
        <ul class="news">
          ${itemsMediaHtml || '<!-- No news items provided -->'}
        </ul>
      </div>
    </section>
  `;
}

