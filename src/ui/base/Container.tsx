import React from "react";

export const Container = ( { children }: { children: React.ReactNode } ) => {
  return (<div className={"pt-[4.4rem] px-[2.4rem] pb-[2rem] max-w-[37.5rem] mx-auto min-h-[100vh] flex flex-col"}>
    {children}
  </div>)
}
