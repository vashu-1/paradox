'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../Services/SupabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth?error=callback_failed');
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to home or event page
          router.push('/');
        } else {
          // No session found, redirect back to auth
          router.push('/auth');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/auth?error=unexpected');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-white text-lg">Completing authentication...</p>
        <p className="text-purple-400 text-sm mt-2">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
}
