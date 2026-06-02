export default {
  title: 'Components/Tracking API',
};

// 1. Declarative HTML Tracking Story
export const DeclarativeTracking = {
  parameters: {
    docs: {
      description: {
        story: `
An example of a declarative HTML element. The \`data-gtm-track\` attribute specifies the type of interaction (\`click\`).
The secondary \`data-gtm-id\` defines a unique identifier, and \`data-gtm-vars\` accepts single quotes containing a valid JSON string object of payload variables.

*Open your browser inspector developer console to see the real-time GTM payloads outputting on click.*
        `,
      },
    },
  },
  render: () => `
    <div style="padding: 20px; font-family: sans-serif;">
      <a id="logo" 
         href="javascript:void(0);" 
         title="Link to the example page" 
         data-gtm-track="click" 
         data-gtm-id="main-logo" 
         data-gtm-vars='{ "width": "153px", "height": "1003px", "loadingTime": 13.342 }'
         style="display: inline-block; padding: 10px 15px; background: #0076d6; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;"
      >
        Link that triggers custom event
      </a>
    </div>
  `,
  play: async ({ canvasElement }) => {
    // If the library autoRegister is on, force a rerun inside the story canvas context frame
    if (window.jQuery && window.toolkitTracker) {
      // Small delay ensures DOM elements have rendered into Storybook's iframe canvas
      setTimeout(() => {
        window.jQuery(canvasElement).find('[data-gtm-track]').each(function() {
          // If your library doesn't automatically look inside dynamically appended story elements, 
          // we re-register them manually via the window layout here.
        });
      }, 100);
    }
  }
};

// 2. Programmatic API Legacy Constructor Story
export const ProgrammaticTracking = {
  parameters: {
    docs: {
      description: {
        story: `
Example showing how to configure tracking manually using the pre-ES6 legacy/global constructor API. 
Here, \`autoRegister: false\` is bypassed, and components are passed to the tracker context safely via jQuery selectors.
        `,
      },
    },
  },
  render: () => `
    <div style="padding: 20px; font-family: sans-serif;">
      <p style="margin-bottom: 10px; font-size: 14px; color: #555;">This target link is explicitly registered programmatically through JavaScript code:</p>
      <a id="programmatic-logo" 
         href="javascript:void(0);" 
         data-gtm-track="click" 
         style="display: inline-block; padding: 10px 15px; background: #333; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;"
      >
        Programmatic API Registered Link
      </a>
    </div>
  `,
  play: async ({ canvasElement }) => {
    // Execute legacy script configuration after Storybook mounts the DOM node
    if (window.toolkitTracker && window.jQuery) {
      const $ = window.jQuery;
      
      // Initialize instance with autoRegister deactivated
      const tracker = window.toolkitTracker({ autoRegister: false });
      
      const logoElement = $(canvasElement).find('#programmatic-logo');
      
      if (tracker.shouldTrackElement(logoElement[0])) {
        // Manually bind tracking hooks over the element selection array
        tracker.registerForTracking(logoElement.toArray(), 'click', 'manual-logo-event');
      }
    } else {
      console.warn("Toolkit tracking libraries were not detected globally.");
    }
  },
};
