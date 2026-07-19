import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] overflow-hidden">
      <div className="h-1 w-full bg-lime-100">
        <motion.div
          className="h-full w-40 bg-lime-600"
          animate={{
            x: ["-160px", "calc(100vw + 160px)"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
