import { expect, userEvent, within } from 'storybook/test';
import { createPage } from './Icons';

export default {
  title: 'Components/Icons',
  render: () => createPage(),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};


export const LoggedOut = {};

export const LoggedIn = {};
