import { db } from '@lib/firebase';
import { ITerm, ITermWithUser } from '@shared/types';
import { doc, getDoc } from 'firebase/firestore';
import { getUserById } from './getUserById';

export const getOneTerm = async (termId: string) => {
   const termRef = doc(db, 'terms', termId);
   const termSnap = await getDoc(termRef);
   const term = termSnap.data() as ITerm;
   const user = await getUserById(term.userId);
   return {
      ...term,
      user: {
         avatar: user?.avatar,
         username: user?.username,
         email: user?.email,
      },
   } as ITermWithUser;
};
