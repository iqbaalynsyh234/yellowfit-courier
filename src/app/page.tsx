"use client";

import './globals.css'
import LoginForm from "@/components/LoginForm"
import SplashScreen from "@/components/SplashScreen"
import { AnimatePresence } from "framer-motion"
import React from "react"
import { isAuthenticated } from "@/lib/yellowfit-courier/api/signin"
import { useRouter } from "next/navigation"

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const checkAuthStatus = () => {
      if (isAuthenticated()) {
        router.push('/dashboard');
      } else {
        setIsCheckingAuth(false);
      }
    };
    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, [router]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>
      {!showSplash && <LoginForm />}
    </>
  );
}