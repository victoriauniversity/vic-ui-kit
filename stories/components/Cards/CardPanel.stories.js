export default {
  title: 'Components/Cards/CardPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card blocks used to display high-level summaries and direct users to nested sub-sections. Intended for orchestration across hub pages.',
      },
    },
  },
  argTypes: {
    cards: {
      control: 'object',
      description: 'An array of card objects containing titles, paragraphs, and primary/secondary button strings.',
    },
  },
};

const renderCardPanel = (cardsArray) => {
  const cardsHtml = cardsArray.map(card => {
    // Generate dynamic buttons structure
    const primaryBtn = card.primaryButtonText 
      ? `<a title="${card.primaryButtonTitle || card.primaryButtonText}" href="${card.primaryButtonHref || '#'}" class="button large primary">${card.primaryButtonText}</a>` 
      : '';
      
    const secondaryBtn = card.secondaryButtonText 
      ? `<a title="${card.secondaryButtonTitle || card.secondaryButtonText}" href="${card.secondaryButtonHref || '#'}" class="button large">${card.secondaryButtonText}</a>` 
      : '';

    return `
      <section class="card">
        <h2>${card.title}</h2>
        ${card.paragraphs.map(p => `<p>${p}</p>`).join('')}
        ${primaryBtn}
        ${secondaryBtn}
      </section>
    `;
  }).join('');

  return `
    <div class="centraliser">
      <div class="block formatting">
        <div class="card-panel">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
};

export const Playground = {
  args: {
    cards: [{
      "title": "Choose Victoria and make a difference",

      "paragraphs": [
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.",
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields."
      ],

      "primaryButtonText": "Learn more",
      "primaryButtonTitle": "Why to study at Victoria"
    }, {
      "title": "Funding your study",

      "paragraphs": [
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields."
      ],

      "primaryButtonText": "Learn more",
      "secondaryButtonText": "Scholarships"
    }, {
      "title": "Choose Victoria and make a difference",

      "paragraphs": [
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.",
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields."
      ],

      "primaryButtonText": "Learn more",
      "primaryButtonTitle": "Why to study at Victoria"
    }, {
      "title": "Funding your study",

      "paragraphs": [
        "Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields."
      ],

      "primaryButtonText": "Learn more",
      "secondaryButtonText": "Scholarships"
    }],
  },
  render: (args) => renderCardPanel(args.cards),
};
