// Настройка метаданных компонента
export default {
    title: 'Components/Button',
    tags: ['autodocs'],
    parameters: {
    docs: {
      description: {
        component: 'Other lists have the `.list` class wrapper. You can add a heading followed by `.links` on the `ul` element.',
      },
    },
  },
  render: (args) => {

    const classes = [
      'button',
      args.variant !== 'default' ? args.variant : '',
      args.size !== 'default' ? args.size : '',
      args.noIcon ? 'no-icon' : '',
      args.disabled ? 'disabled' : '',
      args.hoverState ? `${args.variant}-hover` : '',
    ].filter(Boolean).join(' ');

    const iconHtml = !args.noIcon && args.variant === 'danger' 
      ? '<span class="icon-cross"></span>' 
      : '';

    return `<a href="${args.href}" class="${classes}">${iconHtml}${args.label}</a>`;
  },

  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'flat', 'flat-border', 'primary flat-border', 'secondary', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['default', 'large', 'extra-large'],
    },
    noIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hoverState: { control: 'boolean', description: 'Симуляция ховер-эффекта через класс' },
  },
};

export const Default = {
  args: {
    label: 'Default',
    href: '#',
    variant: 'default',
  },
};

export const Primary = {
  args: {
    label: 'Primary',
    href: '#',
    variant: 'primary',
  },
};

export const Flat = {
  args: {
    label: 'Flat - button-like spacing',
    href: '#',
    variant: 'flat',
  },
};

export const FlatBorder = {
  args: {
    label: 'Flat Button with border',
    href: '#',
    variant: 'flat-border',
  },
};

export const PrimaryFlatBorder = {
  args: {
    label: 'Flat Button with border',
    href: '#',
    variant: 'primary flat-border',
  },
};

export const Large = {
  args: {
    label: 'Default large',
    href: '#',
    variant: 'default',
    size: 'large',
  },
};

export const ExtraLarge = {
  args: {
    label: 'Default extra large',
    href: '#',
    variant: 'default',
    size: 'extra-large',
  },
};

export const Danger = {
  args: {
    label: 'Danger',
    href: '#',
    variant: 'danger',
  },
};

export const DangerHover = {
  args: {
    label: 'Danger hover',
    href: '#',
    variant: 'danger',
    hoverState: true,
    noIcon: false,
  },
};

export const DefaultNoIcon = {
  args: {
    label: 'Default - no-icon',
    href: '#',
    variant: 'default',
    noIcon: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled button',
    href: '#',
    variant: 'default',
    disabled: true,
  },
};
