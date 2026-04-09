import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  extract?: React.ReactNode;
  withLine?: boolean;
}

export default function Title({
  children,
  className,
  extract,
  withLine,
}: Props) {
  return (
    <div className={'flex justify-between items-center gap-4'}>
      <h4
        className={`text-(--azure-sky-700) text-lg md:text-xl lg:text-2xl font-bold ${className ? className : ''}`}
      >
        {children}
      </h4>

      {withLine ? (
        <div className={'grow h-px self-center bg-(--azure-sky-600)/10'} />
      ) : null}

      {extract ? extract : null}
    </div>
  );
}
