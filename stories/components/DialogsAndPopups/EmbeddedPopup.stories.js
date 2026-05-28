export default {
  title: 'Components/Popups/EmbeddedPopup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
A content-embedded popup block that can be opened programmatically via clicks or API calls.

### Requirements
- \`id\` of the element with class 'popup' has to be unique.
- **Structural Note:** The element with class 'popup' **is not wrapped** in a \`div.popup-positioner\` container.

### API Method: \`.openPopup(optionsObject)\`
An optional parameters payload can be passed to configure runtime behaviors:
- \`delayInMs\` (default: 0) - Millisecond buffer threshold to stall visibility after triggering the method.
- \`suppressAfterCanceling\` (default: false) - Prevents re-opening the module if an exclusion state is active.
        `,
      },
    },
  },
  argTypes: {
    id: { control: 'text', name: 'Popup Element ID' },
    triggerText: { control: 'text', name: 'Trigger Anchor Text' },
    title: { control: 'text', name: 'Popup Header Title' },
    description: { control: 'text', name: 'Body Text Content' },
    delayInMs: { control: { type: 'number', step: 100 }, name: 'Plugin Delay (ms)' },
    suppressAfterCanceling: { control: 'boolean', name: 'Suppress Future Loads' },
  },
  args: {
    id: 'popup-example3',
    triggerText: 'Open embedded popup block on a click',
    title: 'Embedded popup block opening on demand',
    description: 'This popup block opens dynamically on demand (e.g. when the element is clicked) or dynamically.',
    delayInMs: 0,
    suppressAfterCanceling: false,
  },
  render: (args) => {
    return `
      <div style="padding: 20px; font-family: sans-serif;">
        
        <!-- Example link triggering the popup opening dynamically -->
        <a href="javascript:;" class="embedded-popup-trigger" style="color: #0066cc; font-weight: bold; text-decoration: underline;">
          ${args.triggerText}
        </a>
        
        <br><br>

        <!-- Popup Element (No positioner wrapper container) -->
        <aside class="popup" id="${args.id}"
          role="dialog"
          aria-labelledby="popup-label"
          aria-describedby="popup-description" 
          aria-live="polite"
          style="display: none; border: 1px solid #ccc; padding: 20px; background: #fff; margin-top: 15px; max-width: 450px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
        >
          <header style="margin-bottom: 12px;">
            <a href="javascript:;" class="btn-close" title="Close and don't show again" style="float: right; text-decoration: none; font-size: 24px; line-height: 1; color: #666;">&times;</a>
            <h2 class="caption" id="popup-label" style="margin: 0; font-size: 1.3rem;">${args.title}</h2>
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
    `;
  },
  decorators: [
    (Story, context) => {
      const channelId = `timer-${context.id}`;

      setTimeout(() => {
        const root = document.getElementById(context.id) || document.body;
        const trigger = root.querySelector('.embedded-popup-trigger');

        if (!trigger) return;

        // Custom Event handler mirroring the jQuery method architecture
        const handleTriggerAction = (e) => {
          e.preventDefault();
          const targetId = context.args.id;
          const optionsObject = {
            delayInMs: context.args.delayInMs,
            suppressAfterCanceling: context.args.suppressAfterCanceling
          };

          // Route to live jQuery environment plugin if instantiated
          if (typeof window.$ !== 'undefined' && typeof $.fn.vicApp !== 'undefined') {
            $(`#${targetId}`).vicApp().openPopup(optionsObject);
          } else {
            // Native micro-simulation fallback for sandbox testing
            console.warn(`[Storybook]: jQuery plugin missing. Emulating .openPopup() natively.`);
            if (window[channelId]) clearTimeout(window[channelId]);
            
            window[channelId] = setTimeout(() => {
              const targetPopup = document.getElementById(targetId);
              if (targetPopup) targetPopup.style.display = 'block';
            }, optionsObject.delayInMs);
          }
        };

        const handleCloseAction = (e) => {
          e.preventDefault();
          const targetId = context.args.id;

          if (typeof window.$ !== 'undefined' && typeof $.fn.vicApp !== 'undefined') {
            $(`#${targetId}`).vicApp().closePopup();
          } else {
            const targetPopup = document.getElementById(targetId);
            if (targetPopup) targetPopup.style.display = 'none';
          }
        };

        // Attach listeners cleanly to nodes
        trigger.addEventListener('click', handleTriggerAction);
        root.querySelector('.btn-close')?.addEventListener('click', handleCloseAction);
        root.querySelector('.button-cancel')?.addEventListener('click', handleCloseAction);

      }, 0);

      return Story();
    },
  ],
};

// --- Stories ---

export const DefaultEmbedded = {};

export const DelayedEmbedded = {
  args: {
    id: 'popup-embedded-delayed',
    triggerText: 'Open embedded popup block with 700ms delay configuration',
    delayInMs: 700,
  },
};
