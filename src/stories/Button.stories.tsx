import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from '@/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    size: 'md',
    variant: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Default Button',
    size: 'md',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Default Button',
    size: 'md',
    variant: 'danger',
  },
};