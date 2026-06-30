export default {
  title: 'Components/Messages',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Flash and notification banners used to alert users of system events. **Note:** These styles expect to be wrapped inside a `<div class="formatting">` layout container to handle inner typography spacing.',
      },
    },
  },
  // Set up dynamic control variables for the interactive workspace
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'brand', 'plain', 'warning', 'info', 'success'],
      description: 'The semantic status theme of the notice banner.',
    },
    title: { control: 'text' },
    content: { control: 'text' },
    noIcon: { 
      control: 'boolean',
      description: 'Hides decorative status graphic icons when true.',
    },
  },
};

// Helper renderer to ensure clean output string formatting
const renderFlashMessage = ({ variant, title, content, noIcon }) => {
  const classes = [
    'flash-message',
    variant,
    noIcon ? 'no-icon' : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="formatting">
      <section class="${classes}">
        <h2>${title}</h2>
        ${content}
      </section>
    </div>
  `;
};

// 1. Dynamic Interactive Workspace
export const Playground = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    content: '<p>If you have three quarters, four dimes, and four pennies you have $1.19. You also have the largest possible amount of money in coins without being able to make change for a dollar.</p>',
    noIcon: false,
  },
  render: (args) => renderFlashMessage(args),
};

// 2. Individual Fixed Status Variant Stories
export const ErrorMessage = {
  render: () => renderFlashMessage({
    variant: 'error',
    title: 'Too many elements in the sidebar',
    content: `
      <p>Currently there are 4. The Maximum is 3. Please remove sidebar class from elements you do not want to appear in the sidebar.</p>
      <p>The following sidebar elements were not added:</p>
      <ul>
        <li>first_block_of_highlighted_text</li>
      </ul>
    `,
    noIcon: false,
  }),
};

export const BrandNoIcon = {
  render: () => renderFlashMessage({
    variant: 'brand',
    title: 'Be careful, Squiz update is in progress',
    content: '<p>Any changes you will make will <strong>not</strong> be saved. Update will be finished on 23rd of October 2016.</p>',
    noIcon: true,
  }),
};

export const PlainNoIcon = {
  render: () => renderFlashMessage({
    variant: 'plain',
    title: 'Be careful, Squiz update is in progress',
    content: '<p>Any changes you will make will <strong>not</strong> be saved. Update will be finished on 23rd of October 2016.</p>',
    noIcon: true,
  }),
};

export const WarningMessage = {
  render: () => renderFlashMessage({
    variant: 'warning',
    title: 'Be careful, Squiz update is in progress',
    content: '<p>Any changes you will make will <strong>not</strong> be saved. Update will be finished on 23rd of October 2016.</p>',
    noIcon: false,
  }),
};

export const SuccessMessage = {
  render: () => renderFlashMessage({
    variant: 'success',
    title: 'Signed in as administrator',
    content: '<p>When you finish editing this page, please <a href="#" title="Log out from Squiz">log out</a></p>',
    noIcon: false,
  }),
};
