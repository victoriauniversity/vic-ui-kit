export default {
  title: 'Components/Cards/IconCards',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A variation of the card panel utilizing the `.icon-cards` class wrapper. This modifier centres embedded header icons, paragraphs, and bottom call-to-action button elements within the grid matrix.',
      },
    },
  },
  argTypes: {
    cards: {
      control: 'object',
      description: 'An array of centered card objects detailing icon classes, paragraphs, and optional action buttons.',
    },
  },
};

const renderIconCards = (cardsArray) => {
  const cardsHtml = cardsArray.map(card => {
    // Structural wrapper for the icon glyph block
    const iconHeader = card.iconClass 
      ? `<span><i class="${card.iconClass}"></i></span>` 
      : '';

    const actionBtn = card.buttonText 
      ? `<a title="${card.buttonTitle || card.buttonText}" href="${card.buttonHref || '#'}" class="button large primary">${card.buttonText}</a>` 
      : '';

    return `
      <section class="card">
        ${iconHeader}
        ${card.paragraphs.map(text => `<p>${text}</p>`).join('')}
        ${actionBtn}
      </section>
    `;
  }).join('');

  return `
    <div class="centraliser">
      <div class="block formatting">
        <div class="card-panel icon-cards">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
};

export const IconCards = {
  args: {
    cards: [
      {
        iconClass: 'icon-book',
        paragraphs: [
          'Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.'
        ],
        buttonText: 'Victoria’s research performance and rankings',
        buttonTitle: 'Why to study at Victoria',
      },
      {
        iconClass: 'icon-graduation-cap',
        paragraphs: [
          'Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.'
        ],
      }
    ],
  },
  render: (args) => renderIconCards(args.cards),
};
