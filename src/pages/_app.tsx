import '@/styles/globals.css';
import '@/styles/reset.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const inter = localFont({
  src: [
    { path: '../styles/fonts/inter/Inter_18pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../styles/fonts/inter/Inter_18pt-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../styles/fonts/inter/Inter_18pt-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../styles/fonts/inter/Inter_18pt-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../styles/fonts/inter/Inter_18pt-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
