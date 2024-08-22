import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
  }

function Button({ text, type = 'button', ...rest }: ButtonProps) {
    return (
        <button
        type={type}
        className="text-white bg-button_blue hover:bg-button_blue_hover focus:ring-4 focus:ring-button_blue_active font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        {...rest}
      >
        {text}
      </button>
    );
}

export default Button;