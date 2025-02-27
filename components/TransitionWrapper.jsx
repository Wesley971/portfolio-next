"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      setDisplayedChildren(children);
    }
  }, [children, isTransitioning]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setDisplayedChildren(children);
        setIsTransitioning(false);
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="transition-wrapper"
        onAnimationStart={() => setIsTransitioning(true)}
      >
        {displayedChildren}
      </motion.div>
    </AnimatePresence>
  );
}
