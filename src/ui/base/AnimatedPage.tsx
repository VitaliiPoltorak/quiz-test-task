import React from "react";
import {motion} from 'framer-motion';
import {useLocation} from 'react-router-dom';
import {pageAnimationConfig} from "../../config";

interface AnimatedPageProps {
  children: React.ReactNode;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ( { children } ) => {
  const location = useLocation();
  const { initial, animate, transition, exit } = pageAnimationConfig
  return (
    <motion.div
      key={location.pathname}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  )
}
