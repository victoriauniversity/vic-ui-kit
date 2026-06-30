export default {
  title: 'Components/Tooltip',
  parameters: {
    docs: {
      description: {
        component: `
Tooltips that initialise automatically if the \`data-tooltip\` attribute is present on an element.
<br><br>
By default, tooltips are shown on element \`hover\` (for desktop) or \`tap\` (mobile).
        `,
      },
    },
  },
  // Uses Storybook's native play function to safely run initialization scripts inside the canvas
  play: async ({ canvasElement }) => {
    // --- Auto-Initialise matching canvas tags ---
    canvasElement.querySelectorAll('[data-tooltip]').forEach((el) => {
      window.toolkitTooltips.initTooltip(el);
    });

    // --- Run Programmatic Dynamic Stories Actions ---
    if (typeof window.initFirstDynamicTooltip === 'function') window.initFirstDynamicTooltip();
    if (typeof window.initSecondDynamicTooltip === 'function') window.initSecondDynamicTooltip();
  },
};

// --- Original Tooltip Stories ---

export const IconTooltip = {
  render: () => `
    <span class="icon-help" title="Icon-based tooltip showing on hover (desktop) or on tap (mobile)" data-tooltip></span>
    <button class="button" title="Example of a tooltip on a different type of element" data-tooltip>Tooltip 'on hover'</button>
    <br><br>
    <p>An example of a tooltip within a paragraph of text/content - Before work can start the <span class="inline-tooltip" data-tooltip title="Person Conducting a Business or Undertaking, that is the contractor, business, or organisation">PCBUs</span> managing the work must undertake a site-specific risk assessment to ensure all unacceptable risks are mitigated</p>

  `,
};

export const ButtonTooltip = {
  render: () => `
    <div style="padding: 20px;">
      <button class="button" title="Example of a tooltip on a different type of element" data-tooltip style="padding: 8px 16px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Tooltip 'on hover'</button>
    </div>
  `,
};

export const InlineParagraphTooltip = {
  render: () => `
    <div style="padding: 20px; font-family: sans-serif; line-height: 1.6; max-width: 600px;">
      <p>An example of a tooltip within a paragraph of text/content - Before work can start the 
        <span class="inline-tooltip" data-tooltip title="Person Conducting a Business or Undertaking, that is the contractor, business, or organisation" style="border-bottom: 2px dashed #0076d6; cursor: help; color: #0076d6; font-weight: 500;">PCBUs</span> 
        managing the work must undertake a site-specific risk assessment to ensure all unacceptable risks are mitigated.
      </p>
    </div>
  `,
};

// --- New Trigger & API Variant Stories ---

export const ClickTriggerTooltip = {
  parameters: {
    docs: {
      description: {
        story: "Optionally, the event triggering showing/hiding of the tooltip can be changed to `on click`. This makes the tooltip stay open until the user clicks anywhere outside of the element or tooltip.",
      },
    },
  },
  render: () => `
    <div style="padding: 20px; font-family: sans-serif;">
      <a href="javascript:;" data-tooltip='{"trigger":"click"}' title="Example of a tooltip triggered 'on click' and staying open" style="color: #0076d6; text-decoration: underline; cursor: pointer;">Tooltip 'on click'</a>
    </div>
  `,
};

export const DynamicAPITooltips = {
  parameters: {
    docs: {
      description: {
        story: "Tooltips can be dynamically initialised for any individual element on-demand using the programmatic Toolkit Tooltips JavaScript API.",
      },
    },
  },
  render: () => {
    window.initFirstDynamicTooltip = function() {
      const el = document.getElementById('tooltip-dynamic-1');
      if (el && window.toolkitTooltips) window.toolkitTooltips.initTooltip(el);
    };

    window.initSecondDynamicTooltip = function() {
      const el = document.getElementById('tooltip-dynamic-2');
      if (el && window.toolkitTooltips) {
        window.toolkitTooltips.initTooltip(el, {
          trigger: 'click',
          content: "Dynamically initialised tooltip triggered 'on click' and staying open (dynamic content)"
        });
      }
    };

    return `
      <div style="padding: 20px; font-family: sans-serif; display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
        <div>
          <label style="display:block; margin-bottom: 5px; font-weight: bold;">Dynamic tooltip #1 (Programmatic Hover):</label>
          <span class="icon-info" id="tooltip-dynamic-1" title="Dynamically initialised tooltip triggered 'on hover' or 'on tap' (mobile)" style="display: inline-block; width: 20px; height: 20px; background: #555; color: white; border-radius: 50%; text-align: center; line-height: 20px; cursor: pointer; font-weight: bold;">i</span>
        </div>

        <div>
          <label style="display:block; margin-bottom: 5px; font-weight: bold;">Dynamic tooltip #2 (Programmatic Click with Override Content):</label>
          <button class="button" id="tooltip-dynamic-2" style="padding: 8px 16px; background-color: #e0e0e0; border: 1px solid #999; border-radius: 4px; cursor: pointer;">
            Dynamically initialised 'on click' tooltip
          </button>
        </div>
      </div>
    `;
  },
};
