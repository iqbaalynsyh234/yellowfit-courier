"use client";

import './globals.css'
import LoginForm from "@/components/LoginForm"
import SplashScreen from "@/components/SplashScreen"
import { AnimatePresence } from "framer-motion"
import React from "react"

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {!showSplash && <LoginForm />}
    </>
  );
}