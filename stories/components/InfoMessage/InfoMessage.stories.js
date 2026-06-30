export default {
  title: 'Components/InfoMessage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An multi-column information stats bar wrapped inside template centraliser layout grids. Features a bold heading row alongside three independent content columns.',
      },
    },
  },
  argTypes: {
    sectionTitle: { control: 'text', name: 'Main Row Title' },
    col1Heading: { control: 'text', name: 'Column 1 Header' },
    col1Text: { control: 'text', name: 'Column 1 Body' },
    col2Heading: { control: 'text', name: 'Column 2 Header' },
    col2Text: { control: 'text', name: 'Column 2 Body' },
    col3Heading: { control: 'text', name: 'Column 3 Header' },
    col3Text: { control: 'text', name: 'Column 3 Body' },
  },
};

export const InfoMessage = {
  args: {
    sectionTitle: 'Facts and figures',
    col1Heading: 'Top 2%',
    col1Text: 'Victoria University is New Zealand’s top ranked university for research quality.',
    col2Heading: 'Top 2%',
    col2Text: 'Victoria University is New Zealand’s top ranked university for research quality.',
    col3Heading: 'Top 2%',
    col3Text: 'Victoria University is New Zealand’s top ranked university for research quality.',
  },
  render: (args) => `
    <div class="centraliser">
      <div class="block">
        <section class="flash-message info info-row">
          <h2>${args.sectionTitle}</h2>
          <div class="info-col">
            <h4>${args.col1Heading}</h4>
            <p>${args.col1Text}</p>
          </div>
          <div class="info-col">
            <h4>${args.col2Heading}</h4>
            <p>${args.col2Text}</p>
          </div>
          <div class="info-col">
            <h4>${args.col3Heading}</h4>
            <p>${args.col3Text}</p>
          </div>
        </section>
      </div>
    </div>
  `,
};
