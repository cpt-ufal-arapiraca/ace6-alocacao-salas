import React, { forwardRef, useState } from 'react';
import { InputMask } from '@react-input/mask';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string;
  mask?: string;
  replacement?: Record<string, RegExp>;
  type?: string;
  showPasswordToggle?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  row?: string;
  col?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, mask, replacement, type = 'text', showPasswordToggle = false, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev);
    };

    return (
      <div className="flex flex-col row-auto col-auto relative">
        <label className="block mb-1 text-sm font-bold text-text_primary dark:text-white">
          {label}
        </label>
        {mask ? (
          <InputMask
            ref={ref}
            mask={mask}
            replacement={replacement}
            className={`bg-gray-50 border border-gray-300 text-text_primary text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              ${error ? 'bg-red-50 border border-alert_erro text-red-900 placeholder-red-700 text-sm rounded focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-gray-300'}`}
            placeholder={placeholder}
            type={type}
            {...rest}
          />
        ) : (
          <input
            ref={ref}
            className={`bg-gray-50 border border-gray-300 text-text_primary text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              ${error ? 'bg-red-50 border border-alert_erro text-red-900 placeholder-red-700 text-sm rounded focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-gray-300'}`}
            placeholder={placeholder}
            type={showPasswordToggle && showPassword ? 'text' : type}
            {...rest}
          />
        )}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? 'v' : 'f'}
          </button>
        )}
        {error && <p className="text-alert_erro text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, row = 'row-auto', col = 'col-auto', ...rest }, ref) => {
    return (
      <div className={`flex flex-col ${row} ${col}`}>
        <label className="mb-1 text-sm text-text_primary font-bold">{label}</label>
        <select
          ref={ref}
          className={`border text-text_primary p-2 rounded ${error ? 'border-alert_error' : 'border-border_base_input'}`}
          {...rest}
        >
          <option value="" disabled hidden>
            Selecione uma opção
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
