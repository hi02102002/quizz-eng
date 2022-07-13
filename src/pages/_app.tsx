import { initAuth } from '@lib/firebase';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter();

   useEffect(() => {
      const handleStart = (url: string) => {
         nProgress.start();
      };
      const handleStop = () => {
         nProgress.done();
      };

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleStop);
      router.events.on('routeChangeError', handleStop);

      return () => {
         router.events.off('routeChangeStart', handleStart);
         router.events.off('routeChangeComplete', handleStop);
         router.events.off('routeChangeError', handleStop);
      };
   }, [router]);

   return (
      <>
         <ToastContainer
            position="top-center"
            hideProgressBar={true}
            draggable
            autoClose={2000}
            closeButton={false}
            theme="colored"
         />
         <Component {...pageProps} />
      </>
   );
}

export default MyApp;
