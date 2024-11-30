import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import cn from 'classnames';
import ProvidersAuth from './auth/ProvidersAuth';

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
    <div style={{ height: '100%' }} className={cn(inter.className)}>
      <ProvidersAuth>
        <Component {...pageProps} />
      </ProvidersAuth>
    </div>
  );
}
