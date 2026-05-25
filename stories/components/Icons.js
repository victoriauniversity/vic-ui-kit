const iconNames = [
  "icon-search",
  "icon-mail",
  "icon-heart",
  "icon-check",
  "icon-star",
  "icon-help",
  "icon-people",
  "icon-user",
  "icon-info",
  "icon-home",
  "icon-back",
  "icon-pictures",
  "icon-popup",
  "icon-clock",
  "icon-tag",
  "icon-book",
  "icon-book-open",
  "icon-pin",
  "icon-vcard",
  "icon-chat",
  "icon-flag",
  "icon-external",
  "icon-printer",
  "icon-camera",
  "icon-lock",
  "icon-lock-open",
  "icon-phone",
  "icon-attention",
  "icon-resize-up",
  "icon-resize-down",
  "icon-mic",
  "icon-cog",
  "icon-share",
  "icon-basket",
  "icon-comment",
  "icon-caret-down-thin",
  "icon-caret-left-thin",
  "icon-caret-right-thin",
  "icon-caret-up-thin",
  "icon-caret-down",
  "icon-caret-left",
  "icon-caret-right",
  "icon-caret-up",
  "icon-triangle-down",
  "icon-triangle-left",
  "icon-triangle-right",
  "icon-triangle-up",
  "icon-refresh",
  "icon-graduation-cap",
  "icon-ticket",
  "icon-megaphone",
  "icon-calendar",
  "icon-globe",
  "icon-dots",
  "icon-arrow-down",
  "icon-arrow-left",
  "icon-layout",
  "icon-attach",
  "icon-menu",
  "icon-arrow-right",
  "icon-arrow-up",
  "icon-edit",
  "icon-download",
  "icon-audio",
  "icon-quote-down",
  "icon-quote-up",
  "icon-list",
  "icon-money",
  "icon-plane",
  "icon-creditcard",
  "icon-cross"
];

export const createPage = () => {
  const article = document.createElement('article');

  const tableRowsHTML = iconNames.map(iconName => {
    const codeSnippet = `&lt;i class="${iconName}"&gt;&lt;/i&gt;`;
    
    return `
      <tr>
        <td style="text-align: center; font-size: 20px; padding: 10px;"><i class="${iconName}"></i></td>
        <td style="font-weight: bold; padding: 10px;">${iconName}</td>
        <td style="padding: 10px;"><code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px;">${codeSnippet}</code></td>
      </tr>
    `;
  }).join('');

  const sectionHTML = `
  <section class="storybook-page" style="font-family: sans-serif; padding: 20px;">
  <i class="social-icon"></i>
    <h2 style="margin-bottom: 20px;">System Icons Gallery</h2>
    <table style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="border-bottom: 20px solid transparent;">
          <th style="width: 10%; padding-bottom: 8px;">Visual</th>
          <th style="width: 40%; padding-bottom: 8px;">Icon Name</th>
          <th style="width: 50%; padding-bottom: 8px;">HTML Usage Example</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHTML}
      </tbody>
    </table>
  </section>
  `;

  article.insertAdjacentHTML('beforeend', sectionHTML);

  return article;
};