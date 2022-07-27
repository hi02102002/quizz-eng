import { v4 } from 'uuid';

export const ROUTES = {
   HOME: '/',
   LOGIN: '/login',
   SIGN_UP: '/sign-up',
   API_lOGIN: '/api/login',
   API_LOG_OUT: '/api/logout',
   CREATE: '/create',
   FORGOT_PASSWORD: '/forgot-password',
   EDIT: '/edit',
   TERM: '/term',
   FLASHCARDS: '/flashcards',
   QUESTIONS: '/questions',
   GAME: '/game',
   WRITE: '/write',
   PROFILE: '/profile',
   EXPLORE: '/explore',
};

export const SIDE_BAR_LIST = [
   {
      id: v4(),
      name: 'Home',
      link: ROUTES.HOME,
   },
   {
      id: v4(),
      name: 'Explore',
      link: ROUTES.EXPLORE,
   },
];
