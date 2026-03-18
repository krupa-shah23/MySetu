import React from 'react';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pl-1">
      <div>
        <h1 className="text-3xl md:text-[2.5rem] font-[800] tracking-tight text-slate-800 mb-1.5 leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] font-semibold text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="self-start md:self-auto">
          {action}
        </div>
      )}
    </div>
  );
}
