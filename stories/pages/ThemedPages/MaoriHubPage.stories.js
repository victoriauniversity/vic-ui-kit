import { createMaoriHubPage } from './MaoriHubPage';

export default {
  title: 'Pages/Māori Hub/Gateway Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Full Māori Hub Gateway Landing Layout
Compiles high-level structural patterns into a single template structure:
- **Top Sidebar Hero Banners:** Side-menu responsive layout blocks mapping image assets.
- **Alternating Flow Blocks:** Media containers tracking content blocks sequentially.
- **Left Text Overlay Frame:** Photo-background banner mapping custom header content tracking the *Living Pā* design framework values.
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['red', 'blue', 'green'],
      description: 'Changes high-level campus style themes.',
    },
    heading: { control: 'text', description: 'Tall banner primary string overlay title.' },
    navColor: { control: 'text', description: 'Global header navigation context token value.' },
    logoColor: { control: 'text', description: 'Brand asset tracking logo coloring parameter.' },
  },
};

export const DefaultRedThemePage = {
  args: {
    theme: 'red',
    heading: 'The Living Pā',
    navColor: 'white',
    logoColor: 'green',
  },
  render: (args) => createMaoriHubPage(args),
};

export const AlternateBlueThemePage = {
  args: {
    theme: 'blue',
    heading: 'Te Herenga Waka Innovation Hub',
    navColor: 'dark',
    logoColor: 'white',
  },
  render: (args) => createMaoriHubPage(args),
};
