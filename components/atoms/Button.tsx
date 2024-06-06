import { ReactElement } from 'react';

type Props = {
  onClick: () => void;
  variant?: 'text' | 'outlined';
  color?: 'normal' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: string;
};

export const Button = ({
  onClick,
  variant = 'text',
  color = 'normal',
  size = 'medium',
  disabled = false,
  children,
}: Props) => {
  let className = {
    padding: 'px-2 py-1',
    boderRadius: 'rounded-lg',
    textColor: 'text-white',
    bgColor: 'bg-slate-800',
    disabledTextColor: 'disabled:text-slate-500',
    disabledBgColor: 'disabled:bg-slate-300',
    disabledborderColor: 'disabled:border-slate-300',
    borderColor: 'border-slate-800',
    borderWidth: 'border-2',
    fontSize: 'text-base',
  };

  //Color
  if (color == 'danger') {
    className['bgColor'] = 'bg-red-600';
    className['borderColor'] = 'border-red-600';
  }

  //Variant
  if (variant == 'outlined') {
    className['textColor'] = 'text-slate-800';
    className['bgColor'] = 'bg-transparent';
    className['disabledBgColor'] = 'disabled:bg-transparent';
    if (color == 'danger') {
      className['textColor'] = 'text-red-600';
    }
  }

  //Size
  if (size == 'small') {
    className['fontSize'] = 'text-sm';
    className['padding'] = 'px-1 py-0.5';
  } else if (size == 'large') {
    className['fontSize'] = 'text-lg';
    className['padding'] = 'px-3 py-1.5';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={Object.values(className).join(' ')}
    >
      <div className=""></div>
      {children}
    </button>
  );
};
