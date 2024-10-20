import React, { forwardRef, useState } from 'react';
import { InputMask } from '@react-input/mask';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string;
  mask?: string;
  replacement?: Record<string, RegExp>;
  type?: string | 'text' | 'number'; 
  showPasswordToggle?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  row?: string;
  col?: string;
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  value: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, mask, replacement, type, showPasswordToggle = false, value, onChange, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev);
    };

    return (
      <div className="flex flex-col row-auto col-auto relative">
        <label className="block mb-1 text-sm font-bold text-text_primary">
          {label}
        </label>
        <div className="relative">
          {mask ? (
            <InputMask
              ref={ref}
              mask={mask}
              replacement={replacement}
              className={`${error ? 'border border-alert_error text-sm rounded focus:ring-red-500 focus:border-red-500 block w-full p-2.5 '
                 : 'border border-border_input text-text_primary text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'}`}
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onChange}
              {...rest}
            />
          ) : (
            <input
              ref={ref}
              className={`${error ? 'border border-alert_error text-sm rounded focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ' 
                : 'border border-border_input text-text_primary text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'}`}
              placeholder={placeholder}
              type={showPasswordToggle && showPassword ? 'text' : type}
              value={value}
              onChange={onChange}
              {...rest}
            />
          )}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-text_primary"
            >
              {showPassword ? (
                <i className="fi fi-rr-eye flex items-center"></i>
              ) : (
                <i className="fi fi-rr-eye-crossed flex items-center"></i>
              )}
            </button>
          )}
        </div>
        {error && <p className="text-alert_error text-xs mt-1">{error}</p>}
      </div>
    );
  }
);


export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, row = 'row-auto', col = 'col-auto', value, onChange, ...rest }, ref) => {
    return (
      <div className={`flex flex-col ${row} ${col}`}>
        <label className="mb-1 text-sm text-text_primary font-bold">{label}</label>
        <select
          ref={ref}
          className={`border text-text_primary p-2 rounded ${error ? 'border-alert_error' : 'border-border_base_input'}`}
          value={value}
          onChange={onChange}
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


export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, value, onChange, checked, ...rest }, ref) => {
    const id = React.useId();
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`cursor-pointer form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out ${error ? 'border-alert_error' : 'border-border_input'}`}
          value={value}
          onChange={onChange}
          checked={checked}
          {...rest}
        />
        <label htmlFor={id} className="ml-2 text-sm text-text_primary">
          {label}
        </label>
        {error && <p className="text-alert_error text-xs ml-2">{error}</p>}
      </div>
    );
  }
);
