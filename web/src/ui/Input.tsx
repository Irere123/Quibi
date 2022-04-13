/* eslint-disable no-unused-expressions */
import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, error, transparent = true, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-400`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 rounded text-black placeholder-black focus:outline-none ${bg} ${ring} ${className} `;

    return textarea ? (
      <textarea
        ref={ref as any}
        className={cn}
        data-testid="textarea"
        {...(props as any)}
      />
    ) : (
      <input ref={ref} className={cn} {...props} />
    );
  }
);

Input.displayName = "Input";
