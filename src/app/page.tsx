'use client';

import './globals.css';
import LoginForm from '@/components/LoginForm';
import SplashScreen from '@/components/SplashScreen';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { isAuthenticated } from '@/lib/yellowfit-courier/api/signin';
import { useRouter } from 'next/navigation';

export default function Home() {
 const [showSplash, setShowSplash] = React.useState(true);
 const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
 const [authError, setAuthError] = React.useState<string | null>(null);
 const router = useRouter();

 React.useEffect(() => {
  const checkAuthStatus = async () => {
   try {
    if (isAuthenticated()) {
     await router.push('/dashboard');
    }
   } catch (error) {
    console.error('Auth check error:', error);
    setAuthError(
     error instanceof Error ? error.message : 'Authentication check failed'
    );
   } finally {
    setIsCheckingAuth(false);
   }
  };

  // Check immediately and then set up periodic checks
  checkAuthStatus();

  // Optional: Set up periodic checks every 5 minutes
  const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

  return () => {
   clearInterval(interval);
  };
 }, [router]);

 const handleSplashFinish = () => {
  setShowSplash(false);
 };

 if (isCheckingAuth) {
  return (
   <div className='flex items-center justify-center min-h-screen bg-black'>
    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400'></div>
   </div>
  );
 }

 if (authError) {
  return (
   <div className='flex items-center justify-center min-h-screen bg-black'>
    <div className='text-red-500 text-center p-4'>
     <p>Error checking authentication:</p>
     <p>{authError}</p>
     <button
      onClick={() => window.location.reload()}
      className='mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg'>
      Retry
     </button>
    </div>
   </div>
  );
 }

 return (
  <>
   <AnimatePresence>
    {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
   </AnimatePresence>
   {!showSplash && <LoginForm />}
  </>
 );
}
