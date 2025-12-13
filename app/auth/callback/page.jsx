'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../Services/SupabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have the auth code in the URL
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const searchParams = new URLSearchParams(window.location.search);

        const code = searchParams.get('code');
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        console.log('Auth callback triggered', { code, access_token });

        if (code) {
          // Exchange code for session (new Supabase PKCE flow)
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
          );

          if (error) {
            console.error('Code exchange error:', error);
            router.push('/auth?error=' + encodeURIComponent(error.message));
            return;
          }

          if (data.session) {
            console.log('Session obtained, redirecting to home');
            router.push('/');
            return;
          }
        } else if (access_token) {
          // Old hash-based flow (fallback)
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token || '',
          });

          if (error) {
            console.error('Set session error:', error);
            router.push('/auth?error=' + encodeURIComponent(error.message));
            return;
          }

          if (data.session) {
            console.log('Session set, redirecting to home');
            router.push('/');
            return;
          }
        }

        // No code or token found, check existing session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.push('/');
        } else {
          console.log('No session found, redirecting to auth');
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
