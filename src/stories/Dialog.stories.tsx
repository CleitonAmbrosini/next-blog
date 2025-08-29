import { Dialog } from '@/components/Dialog';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'canceled' },
    content: { control: 'text' },
    title: { control: 'text' },
    isVisible: { control: 'boolean' },
    disabledButtons: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Confirm Action',
    content: 'Are you sure you want to continue?',
    disabledButtons: false,
    isVisible: true,
  },
  render: args => {
    const [{ isVisible }, updateArgs] = useArgs();

    return (
      <div className='p-8'>
        <button
          className='bg-slate-200 hover:bg-slate-300 text-slate-950 transition py-2 px-4 rounded'
          onClick={() => {
            updateArgs({ isVisible: true });
          }}
        >
          Open dialog
        </button>

        <Dialog
          {...args}
          isVisible={isVisible}
          onCancel={() => {
            args.onCancel?.();
            updateArgs({ isVisible: false });
          }}
          onConfirm={() => {
            args.onConfirm?.();
            updateArgs({ isVisible: false });
          }}
        />
      </div>
    );
  },
};
