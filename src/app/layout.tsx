import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutWrapper } from '@/components/layout-wrapper';
import Script from 'next/script';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Entrestate OS | Real Estate Intelligence',
  description: 'The first AI Operating System for Real Estate. Build landing pages from brochures, automate Instagram DMs, and launch high-ROI Google Ads.',
  metadataBase: new URL('https://entrestate.com'),
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
    apple: 'https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/logo_white.png?alt=media&token=c606a461-1e96-4115-8930-b530053982e0',
  }
};

// Vendored Inter font so builds don't rely on Google Fonts during compile time.
const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter/inter-latin-wght-normal.woff2',
      weight: '300 700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} antialiased bg-black text-white selection:bg-white/20`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FirebaseClientProvider>
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
        {facebookAppId && (
          <Script id="fb-sdk" strategy="afterInteractive">
          {`
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '${facebookAppId}',
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
        )}
      </body>
    </html>
  );
}
