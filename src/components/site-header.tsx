import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
<<<<<<< HEAD
=======
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  User, 
  Menu, 
  X, 
  ArrowRight, 
  Layout, 
  Globe, 
  Bot, 
  Target,
  Home,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
>>>>>>> parent of a4cc956 (all)
import { EntrestateLogo } from './icons';
import { Button } from './ui/button';
import { auth } from '@/firebase/client'; // Corrected import path


/**
 * Renders the main site header with navigation and user authentication status.
 */
<<<<<<< HEAD
=======

const NAV_LINKS = [
    { href: "/trending", label: "Market Experts", icon: Bot, description: "AI Sales Agents for Instagram" },
    { href: "/discover", label: "Project Data", icon: Globe, description: "3,750+ UAE Real Estate Projects" },
    { href: "/blog", label: "Insights", icon: Layers, description: "Market Trends & AI Analysis" },
    { href: "/docs", label: "System Docs", icon: Layout, description: "Operator Manual & API Reference" },
];

>>>>>>> parent of a4cc956 (all)
export function SiteHeader() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
<<<<<<< HEAD
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
=======
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500",
        isScrolled 
          ? "h-16 bg-black/80 backdrop-blur-2xl border-b border-white/10" 
          : "h-24 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between px-6 max-w-[1800px]">
        
        {/* Identity */}
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <EntrestateLogo />
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white",
                  pathname === link.href ? "text-white" : "text-zinc-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block">
                <Button className="h-12 px-8 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10 group">
                    {user ? 'Dashboard' : 'Start Now'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
            
            <div className="hidden lg:block h-6 w-px bg-white/10 mx-2" />
            
            <Link href="/profile" className="hidden lg:block">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-zinc-500 hover:text-white hover:bg-white/5">
                    <User className="h-5 w-5" />
                </Button>
            </Link>

            {/* Mobile Toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all z-[120]"
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu - The Truth Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[105] lg:hidden"
            />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full sm:w-[400px] z-[110] bg-zinc-950 border-l border-white/10 lg:hidden flex flex-col"
            >
                <div className="flex-1 overflow-y-auto px-8 pt-24 pb-12">
                    <div className="space-y-12">
                        <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Navigation</p>
                            <nav className="flex flex-col gap-6">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                                                pathname === link.href ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white/5 border-white/5 text-zinc-500 group-hover:text-white"
                                            )}>
                                                <link.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className={cn("text-xl font-bold tracking-tight", pathname === link.href ? "text-white" : "text-zinc-400 group-hover:text-white")}>{link.label}</h4>
                                                <p className="text-xs text-zinc-600 font-medium">{link.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-zinc-500 transition-colors" />
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Account</p>
                            <div className="space-y-4">
                                <Link href="/dashboard" className="block">
                                    <div className="p-6 rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 group hover:scale-[1.02] transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <Target className="h-6 w-6" />
                                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                        <h4 className="text-xl font-black tracking-tight">Command Center</h4>
                                        <p className="text-blue-100/60 text-xs font-medium">Manage your sites, ads, and leads.</p>
                                    </div>
                                </Link>
                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/profile" className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-all">
                                        <User className="h-5 w-5 text-zinc-500" />
                                        <span className="text-sm font-bold text-white">Profile</span>
                                    </Link>
                                    <Link href="/docs" className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-all">
                                        <Layout className="h-5 w-5 text-zinc-500" />
                                        <span className="text-sm font-bold text-white">Help Center</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                    {!user ? (
                        <Link href="/dashboard">
                            <Button className="w-full h-16 rounded-[2rem] bg-white text-black font-black text-xl shadow-2xl">
                                Start Building Free
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-white">
                                {user.email?.substring(0, 2).toUpperCase()}
                             </div>
                             <div className="flex-1 min-w-0">
                                <p className="text-white font-bold truncate">{user.displayName || user.email?.split('@')[0]}</p>
                                <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                             </div>
                             <Button variant="ghost" size="icon" className="text-zinc-500" onClick={() => auth.signOut()}>
                                <X className="h-5 w-5" />
                             </Button>
                        </div>
                    )}
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
>>>>>>> parent of a4cc956 (all)
    </header>
  );
}
