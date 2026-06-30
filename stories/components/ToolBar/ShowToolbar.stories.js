export default {
  title: 'Components/Toolbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
The dialog with all available tools will open automatically if the (optionally configurable) \`toolbar\` URL query is present in the URL path.

Because of the size of this component, all core files are downloaded on demand right after user opens the dialog for the first time ('lazy loading').

There are three usual methods to load, initialise and open the toolbar dialog - **programatically**, **click through \`href\`** attribute or **click via \`onclick\` attribute** (for elements without href attribute).

### Public API
- **\`constructor( configurationUrl: string | configurationObject: Object )\`** - Provide either \`configurationUrl\` of the RESTful endpoint with a data model or \`configurationObject\` directly.

### Dependencies
The following JavaScript dependencies must be included:
- **jQuery 1.10+**
- **Polyfill.io v3** - To support older, non-ES6 browsers (IE11+)
- **toolkit.core.js** or **toolkit.js**

*Note: If the **toolkit.core.js** is included, initialise the Toolbar Loader manually by calling \`toolkitCore.initToolbarLoader( additionalResourceSpecList )\` (adds the \`toolkitToolbarLoader\`) and \`toolkitCore.initToolbarUrlListeners()\` (enables the toolbar opening based on the query in current URL).*
        `,
      },
    },
  },
  argTypes: {
    innerHtml: { control: 'text', name: 'Loader Body Content (HTML)' },
  },
};

export const DefaultLoader = {
  args: {
    innerHtml: `
      <a href="javascript:window.toolkitToolbarLoader && window.toolkitToolbarLoader( 'https://www.wgtn.ac.nz/api/toolbar/staff' );void 0;" title="Lazy loads and opens the toolbar dialog">Load and open using \`href\`</a>

      <br><br>

      <button class="button" title="Lazy loads and opens the toolbar dialog" onclick="window.toolkitToolbarLoader && window.toolkitToolbarLoader( 'https://www.wgtn.ac.nz/api/toolbar/students' );void 0;">Load and open using click event</button>
    `,
  },
  render: (args) => {
    // Replace this with your project's specific global container rendering method if needed
    const container = document.createElement('div');
    container.innerHTML = args.innerHtml;
    return container;
  },
};
