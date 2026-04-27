import React from 'react';

type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search' | 'textarea';

interface FormFieldProps {
  id: string;
  label: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
}) => {
  const inputBase =
    'w-full bg-surface border rounded-xl text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm';
  const borderClass = error
    ? 'border-red-500/50 focus:ring-red-500/30'
    : 'border-white/10 focus:border-primary/40 focus:ring-primary/20';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-textPrimary">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${inputBase} ${borderClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          className={`${inputBase} ${borderClass}`}
        />
      )}

      {hint && !error && <p className="text-xs text-textMuted">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
