export default {
  title: 'Components/Forms',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Basic styles for forms. Note the `.error` class on inputs. You should always include clear error helper text to assist users. \n\n **TODO:** Add select options and radio buttons.',
      },
    },
  },

  argTypes: {
    emailValue: { control: 'text', name: 'Email value' },
    nameValue: { control: 'text', name: 'Name value' },
    deptError: { control: 'boolean', name: 'Toggle department error class' },
    errorMsg: { control: 'text', name: 'Error Message text' },
  },
};

export const DefaultForm = {
  render: () => `
    <form class="form" method="GET" action="#">
      <div class="group required">
        <label for="email">Your email</label>
        <input type="email" name="email" id="email" placeholder="your@email.com">
      </div>

      <div class="group">
        <label for="name">Your name</label>
        <input type="text" name="name" id="name">
      </div>

      <div class="group">
        <label for="department">School / Faculty / CSU <em>(required)</em></label>
        <input type="text" name="department" id="department">
      </div>

      <div class="group">
        <label for="feedback">Feedback message</label>
        <textarea placeholder="Your feedback ..." id="feedback" name="feedback"></textarea>
      </div>

      <input type="submit" class="button primary" value="Send feedback">
    </form>
  `,
};

export const FormWithError = {
  render: () => `
    <form class="form" method="GET" action="#">
      <div class="group required">
        <label for="email-error">Your email</label>
        <input type="email" name="email" id="email-error" placeholder="your@email.com">
      </div>

      <div class="group">
        <label for="name-error">Your name</label>
        <input type="text" name="name" id="name-error">
      </div>

      <div class="group">
        <p class="error-text">This error message will show above the field. That way on mobile it's not covered by the keyboard.</p>
        <label for="department-error">School / Faculty / CSU <em>(required)</em></label>
        <input type="text" name="department" id="department-error" class="error">
      </div>

      <div class="group">
        <label for="feedback-error">Feedback message</label>
        <textarea placeholder="Your feedback ..." id="feedback-error" name="feedback"></textarea>
      </div>

      <input type="submit" class="button primary" value="Send feedback">
    </form>
  `,
};

export const InteractivePlayground = {
  args: {
    emailValue: '',
    nameValue: '',
    deptError: true,
    errorMsg: "This error message will show above the field. That way on mobile it's not covered by the keyboard.",
  },
  render: (args) => `
    <form class="form" method="GET" action="#">
      <div class="group required">
        <label for="email-play">Your email</label>
        <input type="email" name="email" id="email-play" placeholder="your@email.com" value="${args.emailValue}">
      </div>

      <div class="group">
        <label for="name-play">Your name</label>
        <input type="text" name="name" id="name-play" value="${args.nameValue}">
      </div>

      <div class="group">
        ${args.deptError ? `<p class="error-text">${args.errorMsg}</p>` : ''}
        <label for="department-play">School / Faculty / CSU <em>(required)</em></label>
        <input type="text" name="department" id="department-play" class="${args.deptError ? 'error' : ''}">
      </div>

      <div class="group">
        <label for="feedback-play">Feedback message</label>
        <textarea placeholder="Your feedback ..." id="feedback-play" name="feedback"></textarea>
      </div>

      <input type="submit" class="button primary" value="Send feedback">
    </form>
  `,
};
