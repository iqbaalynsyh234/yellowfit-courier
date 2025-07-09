import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8 }}
        style={{
          width: 475,
          height: 919,
          position: "fixed",
          top: "50%",
          left: "50%",  
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          background: `url('/assets/yfk/image/bg-img.png') center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.img
          src="/assets/yfk/image/logo.png"
          alt="Logo"
          style={{ width: 70, height: 70 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
