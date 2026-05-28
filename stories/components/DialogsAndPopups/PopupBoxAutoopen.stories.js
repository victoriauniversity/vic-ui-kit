export default {
  title: 'Components/Popups/PopupBoxAutoopen',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
Popup box that opens automatically after a page is loaded.

### Requirements
- \`id\` of the element with class 'popup' has to be unique.

### HTML attributes
- \`data-autoload\` (required): Initialises the auto-loading.
- \`data-opts\` (optional): Valid JSON Object allowing to customise auto-loading behaviour. 
  - \`delayInMs\` (default: 3000) - How long after the page loads should the popup box appear.
  - \`suppressAfterCanceling\` (default: true) - Once the user cancels or closes the popup, the popup will (not) load again next time the same page is loaded.
        `,
      },
    },
  },
  argTypes: {
    id: { control: 'text', description: 'Unique identifier for the popup' },
    delayInMs: { control: { type: 'number', step: 500 }, description: 'Delay before popup appears (ms)' },
    suppressAfterCanceling: { control: 'boolean', description: 'Prevent showing again after close' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    id: 'popup-example4',
    delayInMs: 1500, // Reduced default for a snappier Storybook preview
    suppressAfterCanceling: true,
    title: 'Auto-opening popup box',
    description: 'Pops up immediately after page loads, or after an additional time delay (includes Google Tag Manager tracking)',
  },
  render: (args) => {
    const opts = JSON.stringify({
      delayInMs: args.delayInMs,
      suppressAfterCanceling: args.suppressAfterCanceling
    });

    return `
    <div>
        <a href="javascript:;" onclick="$(${args.id}).vicApp().openPopup()">Open popup box on click</a>
        <!-- Added fixed height container so the page doesn't jump during absolute center renders -->
        <div class="popup-positioner" style="min-height: 250px; position: relative; width: 100%;">
            <aside class="popup" id="${args.id}"
            role="dialog"
            data-autoload
            data-gtm-track
            data-opts='${opts}'
            aria-labelledby="popup-label"
            aria-describedby="popup-description" 
            aria-live="polite"
            style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid #ccc; padding: 20px; background: #fff; z-index: 1000; width: 90%; max-width: 450px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
            >
            <header style="margin-bottom: 12px;">
                <a href="javascript:;" class="btn-close" title="Close and don't show again" data-gtm-id="${args.id}-close" data-gtm-track="click" style="float: right; text-decoration: none; font-size: 24px; line-height: 1; color: #666;">&times;</a>
                <h2 class="caption" id="popup-label" style="margin: 0; font-size: 1.5rem;">${args.title}</h2>
            </header>
            <div class="body formatting">
                <p id="popup-description" style="margin-bottom: 20px; color: #444;">${args.description}</p>
                <div class="btn-holder" style="display: flex; gap: 10px; justify-content: flex-end;">
                    <a class="button button-cancel" href="javascript:;" title="Hide the popup" data-gtm-track="click" data-gtm-id="${args.id}-no" style="padding: 8px 16px; background: #eee; color: #333; text-decoration: none; border-radius: 4px;">No, thanks</a>
                    <a class="button primary button-ok" href="https://qualtrics.com" title="Go to the short survey" target="_blank" data-gtm-id="${args.id}-yes" data-gtm-track="click" style="padding: 8px 16px; background: #0066cc; color: #fff; text-decoration: none; border-radius: 4px;">Take the survey</a>
                </div>
            </div>
            </aside>
        </div>
    </div>
    `;
  },
  // Decorators run logic safely on DOM mounting and element cleanups
  decorators: [
    (Story, context) => {
      // Create a unique timer reference tracking this specific story render cycle
      const channelId = `timer-${context.id}`;
      
      // Clear out any old lingering global windows timers to stop overlaps
      if (window[channelId]) {
        clearTimeout(window[channelId]);
      }

      // Defer execution slightly to make sure the template markup is painted in the DOM
      setTimeout(() => {
        const root = document.getElementById(context.id) || document.body;
        const popup = root.querySelector('.popup');
        const closeBtn = root.querySelector('.btn-close');
        const cancelBtn = root.querySelector('.button-cancel');

        if (!popup) return;

        // Reset visibility state
        popup.style.display = 'none';

        // Set up the reactive timer instance using current args configuration
        window[channelId] = setTimeout(() => {
          popup.style.display = 'block';
        }, context.args.delayInMs);

        // Bind closure cleanups straight to elements
        const hideElement = (e) => {
          e.preventDefault();
          popup.style.display = 'none';
          if (window[channelId]) clearTimeout(window[channelId]);
        };

        closeBtn?.addEventListener('click', hideElement);
        cancelBtn?.addEventListener('click', hideElement);
      }, 0);

      return Story();
    },
  ],
};

// --- Stories ---

export const Default = {};

export const FastOpening = {
  args: {
    id: 'popup-fast',
    delayInMs: 200,
    title: 'Fast Popup',
    description: 'This instance initializes almost immediately upon rendering.',
  },
};

export const PreOpened = {
  args: {
    id: 'popup-immediate',
    delayInMs: 0,
    title: 'Instant Action Notice',
  },
};
