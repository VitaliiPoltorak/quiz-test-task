import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  viewType?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ( {
                                                 children,
                                                 disabled = false,
                                                 onClick,
                                                 type = 'button',
                                                 viewType = 'primary'
                                               } ) => {
  return <button
    className={`flex justify-center items-center gap-[] font-albert text-white text-[1.7rem] tracking-[-.01em] ${viewType === 'primary' ? 'font-extrabold leading-[2.4rem]' : 'font-semibold leading-[2.5rem]'} ${viewType === 'primary' && 'bg-[#E4229C]'} disabled:opacity-[0.4] w-full p-[1.6rem] rounded-[1000px] cursor-pointer`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>;
}
