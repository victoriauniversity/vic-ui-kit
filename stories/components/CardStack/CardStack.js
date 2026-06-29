// Reusable template literal helper function imitating the Handlebars template structure
export const renderCardStack = (args) => {
  // 1. Conditional Figure Image Component Block
  const imageBlock = args.image 
    ? `
      <figure class="c-stack-fig">
          <img class="c-stack-fig--image" src="${args.image}" alt="${args.title}">
      </figure>
    ` 
    : '';

  // 2. Conditional Panel Component Block (Course/Code layout)
  let panelBlock = '';
  if (args.code) {
    const yearSpan = args.year ? `<span>(${args.year})</span>` : '';
    
    let dateInfo = '';
    if (args.startDate) {
      dateInfo = `<p><i class="icon-calendar"></i> <em>${args.startDate}</em></p>`;
    } else if (!args.trimesters && args.year) {
      dateInfo = `<p><i class="icon-attention"></i> <em>Course not offered in ${args.year}</em></p>`;
    }

    let trimesterBlock = '';
    if (args.trimesters) {
      const trimList = args.trimesters.split(',').map(t => `
        <li>
            <a class="c-stack-figLink" href="#trimLink">${t.trim()}</a>
        </li>
      `).join('');
      
      trimesterBlock = `
        <h5>Trimester</h5>
        <ul class="c-stack-figlist">
            ${trimList}
        </ul>
      `;
    }

    panelBlock = `
      <div class="c-stack-fig c-stack-fig--panel">
          <h4 class="c-stack-code">${args.code} ${yearSpan}</h4>
          <div class="c-stack-figcaption">
              ${dateInfo}
              ${trimesterBlock}
          </div>
      </div>
    `;
  }

  // 3. Main Title Block Setup
  let titleBlock = '';
  if (args.title) {
    let urlBlock = '';
    if (args.url) {
      const fileBadge = args.filetype 
        ? `<span class="label label-- file-pdf"><i>${args.filetype}</i><span> 1286460KB</span></span>` 
        : '';
      urlBlock = `<small>${args.url} ${fileBadge}</small>`;
    }

    titleBlock = `
      <h4 class="c-stack-title">
          <a class="c-stack-link" href="#mainLink">${args.title}</a>
          ${urlBlock}
      </h4>
    `;
  }

  // 4. Foot Meta Details Loop
  let metaBlock = '';
  if (args.meta) {
    metaBlock = `
      <ul class="meta">
          <li class="highlight">
              <a href="mailto:${args.email || 'ina.reichenberger'}@vuw.ac.nz" title="Send an email">
                  <i class="icon-mail"></i> ${args.email || 'ina.reichenberger'}@vuw.ac.nz
              </a>
          </li>
          <li class="highlight">
              <a href="tel:04 4635375" title="Call work phone">
                  <i class="icon-phone"></i> 04 4635375
              </a>
          </li>
          <li>
              <i class="icon-pin"></i> Room 917, Rutherford House 23 Lambton Quay
          </li>
      </ul>
    `;
  }

  // 5. Foot Text Links Loop
  let linksBlock = '';
  if (args.links) {
    const splitLinks = args.links.split(',').map(link => `
      <li><a href="#footLink">${link.trim()}</a></li>
    `).join('');
    linksBlock = `<ul class="links">${splitLinks}</ul>`;
  }

  // Assemble full semantic framework structure string
  return `
    <div class="c-stack ${args.classModifier || ''}">
        ${imageBlock}
        ${panelBlock}

        <div class="c-stack-info">
            ${titleBlock}
            ${args.intro ? `<p class="c-stack-intro">${args.intro}</p>` : ''}

            <div class="c-stack-body">
                ${args.innerHtml || ''}
            </div>

            <div class="c-stack-foot">
                ${metaBlock}
                ${linksBlock}
            </div>
        </div>
    </div>
  `;
};