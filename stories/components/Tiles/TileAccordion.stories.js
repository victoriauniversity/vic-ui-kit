import { createTileAccordion } from './TileAccordion';
import { userEvent, within } from '@storybook/test';

export default {
  title: 'Components/Tiles Panel/Tile Accordion',
  parameters: {
    docs: {
      description: {
        component: `
### Description
Strip tiles with built-in accordion panels to expand contextual links and deep-nested directory content.

### Status Warning
⚠️ **NOT USED ANYWHERE** — Retain, refactor, and fix style properties before using in production environments.
        `,
      },
    },
  },
  argTypes: {
    tiles: {
      control: 'object',
      description: 'Dataset collection detailing titles, inner summaries, status state, and internal link trees.',
    },
  },
  args: {
    tiles: [
      {
        title: 'Architecture',
        description: 'With an impressive breadth of collaborations, we champion creativity and exploration. From urban design to wearable technologies, this faculty embodies innovation.',
        isOpen: false,
        links: [
          { text: 'Centre of Building Performance Research (CBPR)', url: '#' },
          { text: 'Earthquake Hazard Centre (EHC)', url: '#' },
        ],
      },
      {
        title: 'Business',
        description: 'At the heart of New Zealand’s business, finance, public and government community, our research expertise supports local and international solutions.',
        isOpen: false,
        links: [
          { text: 'BNZ Chair in Business in Asia', url: '#' },
          { text: 'Brian Picot Chair in Ethical Leadership', url: '#' },
          { text: 'Centre for Accounting Governance and Taxation Research', url: '#' },
          { text: 'Centre for Labour, Employment and Work (CLEW)', url: '#' },
          { text: 'Chair in the Economics of Disasters', url: '#' },
          { text: 'Chair in Public Finance', url: '#' },
          { text: 'Competitive Advantage New Zealand', url: '#' },
        ],
      },
      {
        title: 'Engineering',
        description: 'Our engineering, computer and mathematical science researchers are at the forefront of their fields. Work on pure and applied solutions have global relevance.',
        isOpen: false,
        links: [
          { text: 'Computational Media Innovation Centre (opening June 2018)', url: '#' },
          { text: 'Robinson Research Institute', url: '#' },
        ],
      },
    ],
  },
  render: (args) => createTileAccordion(args),
  // Micro-script to emulate runtime interaction behavior directly inside Storybook workspace
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvasElement.querySelectorAll('.accordion-trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const parentItem = trigger.closest('.tile');
        const contentPanel = parentItem.querySelector('.accordion-content');
        const icon = trigger.querySelector('i');

        if (parentItem.classList.contains('accordion-closed')) {
          // Open Panel
          parentItem.classList.remove('accordion-closed');
          parentItem.classList.add('accordion-open');
          contentPanel.classList.remove('closed');
          icon.className = 'icon-caret-down';
        } else {
          // Close Panel
          parentItem.classList.remove('accordion-open');
          parentItem.classList.add('accordion-closed');
          contentPanel.classList.add('closed');
          icon.className = 'icon-caret-right';
        }
      });
    });
  },
};

export const Default = {};

export const InitialPanelOpen = {
  args: {
    tiles: [
      {
        title: 'Humanities and Social Sciences',
        description: 'Discovering hidden perspectives, tracing cultural currents, and charting new societal paths.',
        isOpen: true,
        links: [
          { text: 'Stout Research Centre for New Zealand Studies', url: '#' },
          { text: 'Deaf Studies Research Unit', url: '#' },
        ],
      },
      {
        title: 'Faculty of Law',
        description: 'Leading legal thought experiments, defending equity paradigms, and defining world-class jurist profiles.',
        isOpen: false,
        links: [{ text: 'New Zealand Centre for Public Law', url: '#' }],
      },
    ],
  },
};
