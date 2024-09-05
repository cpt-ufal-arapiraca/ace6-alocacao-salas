import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    to?: string
  }

  function Button({ text, to, type = 'button', ...rest }: ButtonProps) {
    return (
      <button
        type={type}
        className="text-white bg-button_blue hover:bg-button_blue_hover focus:ring-4 focus:ring-button_blue_active font-medium rounded-lg text-sm px-5 py-2.5"
        {...rest}
      >
        {to && type === 'button' ? (
          <Link to={to}>{text}</Link>
        ) : (
          text
        )}
      </button>
    );
  }

export default Button;