/**
 * Creates a semantic HTML article markup block supporting optional media layouts.
 */
export function createNewsMedia({ news = [] } = {}) {
  // Generate media HTML if provided
  let mediaHtml = '';
  if (news.media) {
    if (news.media.type === 'video') {
      mediaHtml = `
        <figure class="media">
          <iframe width="560" height="315" src="${news.media.src}" frameborder="0" allowfullscreen=""></iframe>
        </figure>
      `;
    } else if (news.media.type === 'image') {
      const portraitClass = news.media.isPortrait ? ' portrait' : '';
      mediaHtml = `
        <figure class="media${portraitClass}">
          <img title="${news.media.title || ''}" src="${news.media.src}" alt="${news.media.alt || ''}">
        </figure>
      `;
    }
  }

  return `
    <article>
        ${mediaHtml}
        <div class="summary formatting">
        <h3>
            <a href="${news.url || '#'}">${news.title || 'Default News Title'}</a>
        </h3>
        <p>
            <time datetime="${news.dateISO || '2016-09-14'}">
            ${news.dateText || '14 September 2016'}
            </time>
        </p>
        <p>${news.content || 'Default news content.'}</p>
        </div>
    </article>
  `;
}
