import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutWrapper } from '@/components/layout-wrapper';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Entrestate OS | Real Estate Intelligence',
  description: 'The first AI Operating System for Real Estate. Build landing pages from brochures, automate Instagram DMs, and launch high-ROI Google Ads.',
  metadataBase: new URL('https://entrestate.com'),
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
    apple: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-black text-white selection:bg-white/20">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FirebaseClientProvider>
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
        <Script id="fb-sdk" strategy="afterInteractive">
          {`
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '1117024043144362',
                cookie     : true,
                xfbml      : true,
                version    : 'v19.0'
              });
              
              FB.AppEvents.logPageView();   
                
            };

            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
      </body>
    </html>
  );
}
