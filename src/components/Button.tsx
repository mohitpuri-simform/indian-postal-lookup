import { type HTMLAttributes, type ReactNode } from "react";
import { clsx } from "../utils/clsx"; // adjust path as necessary

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive: boolean;
  [props: string]: any;
}

function Button({ children, isActive, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "px-2 py-1 border-2 shadow-2xl cursor-pointer",
        isActive ? "text-white bg-blue-400" : "bg-white text-blue-400"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
