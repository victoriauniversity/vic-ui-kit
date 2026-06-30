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

export default {
  title: 'Components/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive icon glossary map for searching, scaling, and copying embedded design asset tags.',
      },
    },
  },
  argTypes: {
    searchQuery: { 
      control: 'text', 
      name: 'Search Icons', 
      description: 'Filter the icon library by keyword string.' 
    },
    layout: {
      control: 'radio',
      options: ['table', 'grid'],
      name: 'Layout Display',
      description: 'Switch between detailed tabular schema and an isolated visual dashboard.'
    },
    iconSize: {
      control: { type: 'range', min: 14, max: 48, step: 2 },
      name: 'Icon Scale (px)',
      description: 'Dynamically resize font glyph renders.'
    }
  }
};

const renderTableLayout = (filteredIcons, size) => {
  const rows = filteredIcons.map(iconName => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="text-align: center; font-size: ${size}px; padding: 12px;"><i class="${iconName}"></i></td>
      <td style="font-weight: bold; padding: 12px; font-family: sans-serif; font-size: 14px;">${iconName}</td>
      <td style="padding: 12px;">
        <code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px; font-size: 13px;">
          &lt;i class="${iconName}"&gt;&lt;/i&gt;
        </code>
      </td>
    </tr>
  `).join('');

  return `
    <table style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="border-bottom: 2px solid #ccc; font-family: sans-serif; font-size: 14px;">
          <th style="width: 10%; padding-bottom: 12px; text-align: center;">Visual</th>
          <th style="width: 40%; padding-bottom: 12px;">Icon Name</th>
          <th style="width: 50%; padding-bottom: 12px;">HTML Usage Example</th>
        </tr>
      </thead>
      <tbody>
        ${rows || '<tr><td colspan="3" style="padding:20px; text-align:center; font-family:sans-serif; color:#666;">No icons match your query.</td></tr>'}
      </tbody>
    </table>
  `;
};

const renderGridLayout = (filteredIcons, size) => {
  if (filteredIcons.length === 0) {
    return `<p style="padding:20px; text-align:center; font-family:sans-serif; color:#666;">No icons match your query.</p>`;
  }

  const cards = filteredIcons.map(iconName => `
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; text-align: center; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
      <div style="font-size: ${size}px; height: 48px; display: flex; align-items: center;"><i class="${iconName}"></i></div>
      <div style="font-size: 11px; font-weight: 600; font-family: sans-serif; color: #4a5568; word-break: break-all;">${iconName}</div>
    </div>
  `).join('');

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1max)); gap: 16px;">
      ${cards}
    </div>
  `;
};

export const InteractiveGallery = {
  args: {
    searchQuery: '',
    layout: 'table',
    iconSize: 20,
  },
  render: (args) => {
    // Process live filter query input match loops
    const cleanQuery = args.searchQuery.trim().toLowerCase();
    const filteredIcons = iconNames.filter(name => name.toLowerCase().includes(cleanQuery));

    const viewMarkup = args.layout === 'grid' 
      ? renderGridLayout(filteredIcons, args.iconSize)
      : renderTableLayout(filteredIcons, args.iconSize);

    return `
      <section style="padding: 10px;">
        <h2 style="font-family: sans-serif; margin-bottom: 24px; color: #1a202c;">System Icons Gallery</h2>
        ${viewMarkup}
      </section>
    `;
  },
};
