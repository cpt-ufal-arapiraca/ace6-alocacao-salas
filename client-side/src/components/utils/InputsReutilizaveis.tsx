import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, ...rest }, ref) => {
    return (
      <div className={`flex flex-col row-auto col-auto `}>
        <label className="block mb-1 text-sm font-bold text-text_primary dark:text-white"> 
        {label}</label>
        <input
          ref={ref}
          className={`bg-gray-50 border border-gray-300 text-text_primary text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
            ${error ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-gray-300'}`}
          placeholder={placeholder}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  row?: string;
  col?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, row = 'row-auto', col = 'col-auto', ...rest }, ref) => {
    return (
      <div className={`flex flex-col ${row} ${col}`}>
        <label className="mb-1 text-sm text-text_primary font-bold">{label}</label>
        <select
          ref={ref}
          className={`border text-text_primary p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
          {...rest}
        >
          <option value="" selected disabled hidden>
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
