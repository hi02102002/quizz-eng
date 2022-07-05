import { ROUTES } from '@constants';
import { init } from 'next-firebase-auth';

console.log(process.env.FIREBASE_PRIVATE_KEY);

const initAuth = () => {
   init({
      authPageURL: ROUTES.LOGIN,
      appPageURL: ROUTES.HOME,
      loginAPIEndpoint: ROUTES.API_lOGIN, // required
      logoutAPIEndpoint: ROUTES.API_LOG_OUT, // required
      onLoginRequestError: (err) => {
         console.error(err);
      },
      onLogoutRequestError: (err) => {
         console.error(err);
      },
      firebaseAdminInitConfig: {
         credential: {
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE as string,
            clientEmail: process.env.CLIENT_EMAIL as string,
            privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
         },
         databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIREBASE as string,
      },
      firebaseClientInitConfig: {
         apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE as string, // required
         authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE as string,
         databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIREBASE as string,
         projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE as string,
      },
      cookies: {
         name: 'quizz-app', // required
         keys: [
            process.env.COOKIE_SECRET_CURRENT,
            process.env.COOKIE_SECRET_PREVIOUS,
         ],
         httpOnly: true,
         maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
         overwrite: true,
         path: '/',
         sameSite: 'strict',
         secure: true, // set this to false in local (non-HTTPS) development
         signed: true,
      },
      onVerifyTokenError: (err) => {
         console.error(err);
      },
      onTokenRefreshError: (err) => {
         console.error(err);
      },
   });
};

export default initAuth;
