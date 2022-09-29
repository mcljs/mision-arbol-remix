import * as React from 'react';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

function Label({ className, ...labelProps }) {
  return (
    <label
      {...labelProps}
      className={clsx('block text-sm font-medium text-gray-900', className)}
    />
  );
}

const Input = React.forwardRef(function Input(props, ref) {
  const className = clsx(
    'shadow-sm  block w-full sm:text-sm border-gray-300 rounded-md mt-2',
    props.className,
  );

  if (props.type === 'textarea') {
    return (
      <textarea
        {...props}
        className={clsx('min-h-[150px] h-auto max-h-[700px]', className)}
      />
    );
  }

  return <input {...props} className={className} ref={ref} />;
});

function InputError({ children, id }) {
  if (!children) {
    return null;
  }

  return (
    <p role="alert" id={id} className="mt-2 text-sm text-red-600">
      {children}
    </p>
  );
}

const Field = React.forwardRef(function Field(
  {
    defaultValue,
    error,
    errorText,
    name,
    label,
    className,
    description,
    id,
    ...props
  },
  ref,
) {
  return (
    <div className={clsx('mt-3', className)}>
      <div className="flex items-baseline justify-between ">
        <Label>{label}</Label>
      </div>
      <div className="mt-1 relative">
        <Input
          className={
            !error
              ? 'shadow-sm focus:ring-primary-500 focus:border-primary-500 border-black border rounded-md p-3 block w-full focus:outline-primary-500'
              : 'shadow-sm block w-full p-3 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md'
          }
          ref={ref}
          {...props}
          name={name}
          id={id}
          autoComplete={name}
          required
          defaultValue={defaultValue}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
});

function ButtonGroup({ children }) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      {children}
    </div>
  );
}

function ErrorPanel({ children, id }) {
  return (
    <div role="alert" className="relative mt-8 px-11 py-8" id={id}>
      <div className="absolute inset-0 bg-red-500 rounded-lg opacity-25" />
      <div className="text-primary-500 relative text-lg font-medium">
        {children}
      </div>
    </div>
  );
}

export { Label, Input, InputError, Field, ButtonGroup, ErrorPanel };
