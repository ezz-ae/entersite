import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { EntrestateLogo } from './icons';
import { Button } from './ui/button';
import { auth } from '@/firebase/client'; // Corrected import path


/**
 * Renders the main site header with navigation and user authentication status.
 */
export function SiteHeader() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <header className="relative z-40 bg-zinc-950 border-b border-white/5 h-16 flex items-center">
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg">
          <EntrestateLogo className="h-6 w-6" />
          <span className="sr-only">Entrestate OS</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white/80 hover:text-white">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
