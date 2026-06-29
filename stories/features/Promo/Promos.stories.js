export default {
  title: 'Features/Promo/Promos Page',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Promo Component
A structured promotional card layout featuring a hyperlinked headline, localized publication timestamp, and main body text content.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', name: 'Title' },
    date: { control: 'text', name: 'Date' },
    dateText: { control: 'text', name: 'Date Text' },
    content: { control: 'text', name: 'Content' },
  },
};