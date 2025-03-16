import React from "react";

export const Container = ( { children }: { children: React.ReactNode } ) => {
  return (<div
    style={{minHeight: 'calc(var(--vh, 1vh) * 100)'}}
    className={"pt-[4.4rem] px-[2.4rem] pb-[2rem] max-w-[37.5rem] mx-auto flex flex-col"}>
    {children}
  </div>)
}
