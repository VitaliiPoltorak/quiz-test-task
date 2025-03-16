import React from "react";
import {FontTypes} from "../../types.ts";

interface TypographyProps {
  children: React.ReactNode
  type?: FontTypes
}

export const Title = ( { children, type }: TypographyProps ) => {

  const className = type === FontTypes.Albert ? "text-[3.0rem] tracking-[-.02em] leading-[3.8rem] font-extrabold text-center text-[#ffffff]" : "text-[2.8rem] tracking-[-.01em] leading-[3.4rem] font-bold text-center text-[#F2F3F5]";

  return (
    <h2 className={className}>
      {children}
    </h2>
  )
}
