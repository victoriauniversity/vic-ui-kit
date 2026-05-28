export default {
  title: 'Components/Popups/PopupBoxOnDemand',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
A popup box that can be opened programmatically (e.g., on clicking an external element or through an explicit API dispatch loop).

### Requirements
- \`id\` of the element with class 'popup' has to be unique.

### API Method: \`.openPopup(optionsObject)\`
An optional parameters payload can be passed to configure temporary runtime settings:
- \`delayInMs\` (default: 0) - Microsecond threshold buffer to stall visual exposure after calling the method.
- \`suppressAfterCanceling\` (default: false) - Prevents re-opening the module if an exclusion cookie state exists.
        `,
      },
    },
  },
  argTypes: {
    id: { control: 'text', name: 'Popup ID Element attribute' },
    triggerText: { control: 'text', name: 'Trigger Link Text' },
    title: { control: 'text', name: 'Popup Title' },
    description: { control: 'text', name: 'Body Content Description' },
    delayInMs: { control: { type: 'number', step: 100 }, name: 'Plugin Delay (ms)' },
    suppressAfterCanceling: { control: 'boolean', name: 'Suppress Future Load' },
  },
  args: {
    id: 'popup-example',
    triggerText: 'Open popup box on click',
    title: 'Popup box opening on demand',
    description: 'This popup opens on demand (e.g. when the element is clicked) or dynamically.',
    delayInMs: 0,
    suppressAfterCanceling: false,
  },
  render: (args) => {
    // Structural wrapper output embedding the click trigger node
    return `
      <div style="padding: 20px; font-family: sans-serif;">
        
        <!-- Example link triggering the popup opening dynamically -->
        <a href="javascript:;" class="popup-trigger-link" style="color: #0066cc; font-weight: bold; text-decoration: underline;">
          ${args.triggerText}
        </a>

        <!-- Popup Portal Markups -->
        <div class="popup-positioner" style="min-height: 200px; position: relative; margin-top: 20px; width: 100%;">
          <aside class="popup" id="${args.id}"
            role="dialog"
            aria-labelledby="popup-label"
            aria-describedby="popup-description" 
            aria-live="polite"
            style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid #ccc; padding: 20px; background: #fff; z-index: 1000; width: 90%; max-width: 450px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
          >
            <header style="margin-bottom: 12px;">
              <a href="javascript:;" class="btn-close" title="Close and don't show again" style="float: right; text-decoration: none; font-size: 24px; line-height: 1; color: #666;">&times;</a>
              <h2 class="caption" id="popup-label" style="margin: 0; font-size: 1.5rem;">${args.title}</h2>
            </header>

            <div class="body formatting">
              <p id="popup-description" style="margin-bottom: 20px; color: #444;">${args.description}</p>
              <div class="btn-holder" style="display: flex; gap: 10px; justify-content: flex-end;">
                  <a class="button button-cancel" href="javascript:;" title="Hide the popup" style="padding: 8px 16px; background: #eee; color: #333; text-decoration: none; border-radius: 4px;">No, thanks</a>
                  <a class="button primary button-ok" href="https://qualtrics.com" title="Go to the short survey" target="_blank" style="padding: 8px 16px; background: #0066cc; color: #fff; text-decoration: none; border-radius: 4px;">Take the survey</a>
              </div>
            </div>
          </aside>
        </div>

      </div>
    `;
  },
  decorators: [
    (Story, context) => {
      // Setup dynamic tracking references to prevent memory leaks or broken bindings
      const channelId = `timer-${context.id}`;

      setTimeout(() => {
        const root = document.getElementById(context.id) || document.body;
        const trigger = root.querySelector('.popup-trigger-link');

        if (!trigger) return;

        // Click Handler executing the exact requested translation bridge
        const handleTriggerClick = (e) => {
          e.preventDefault();
          const targetId = context.args.id;
          const optionsObject = {
            delayInMs: context.args.delayInMs,
            suppressAfterCanceling: context.args.suppressAfterCanceling
          };

          // Check if jQuery and your custom vicApp plugin are globally available
          if (typeof window.$ !== 'undefined' && typeof $.fn.vicApp !== 'undefined') {
            // SUCCESS: Fires your exact required architectural schema format!
            $(`#${targetId}`).vicApp().openPopup(optionsObject);
          } else {
            // FALLBACK LOGIC: Simulates the plugin actions directly inside Storybook if assets aren't connected
            console.warn(`[Storybook Warning]: jQuery plugin '.vicApp()' missing. Falling back to native emulation.`);
            
            if (window[channelId]) clearTimeout(window[channelId]);
            
            window[channelId] = setTimeout(() => {
              const targetPopup = document.getElementById(targetId);
              if (targetPopup) targetPopup.style.display = 'block';
            }, optionsObject.delayInMs);
          }
        };

        // Standard close execution listeners using direct element binding or jQuery fallback wrappers
        const handleCloseClick = (e) => {
          e.preventDefault();
          const targetId = context.args.id;

          if (typeof window.$ !== 'undefined' && typeof $.fn.vicApp !== 'undefined') {
            $(`#${targetId}`).vicApp().closePopup();
          } else {
            const targetPopup = document.getElementById(targetId);
            if (targetPopup) targetPopup.style.display = 'none';
          }
        };

        // Attach listeners safely to the freshly painted elements
        trigger.addEventListener('click', handleTriggerClick);
        root.querySelector('.btn-close')?.addEventListener('click', handleCloseClick);
        root.querySelector('.button-cancel')?.addEventListener('click', handleCloseClick);

      }, 0);

      return Story();
    },
  ],
};

// --- Stories ---

export const DefaultOnDemand = {};

export const DelayedProgrammatic = {
  args: {
    id: 'popup-delayed-demo',
    triggerText: 'Trigger programmatic popup (1-second delay execution)',
    delayInMs: 1000,
  },
};
