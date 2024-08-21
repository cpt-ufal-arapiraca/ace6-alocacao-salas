import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold">{label}</label>
      <input
        ref={ref}
        className={`border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold">{label}</label>
      <select
        ref={ref}
        className={`border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
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
});
