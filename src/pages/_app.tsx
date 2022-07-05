import { initAuth } from '@lib/firebase';
import type { AppProps } from 'next/app';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />;
}

export default MyApp;
