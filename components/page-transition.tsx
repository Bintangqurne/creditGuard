"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setShow(true);
      const t = setTimeout(() => setShow(false), 1400);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key={pathname}
            className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.span
              aria-label="CreditGuard"
              role="img"
              className="block h-12 w-72 bg-foreground"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{
                maskImage: "url(/logo.png)",
                WebkitMaskImage: "url(/logo.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
