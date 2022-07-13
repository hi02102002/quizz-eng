import { db } from '@lib/firebase';
import { IUser } from '@shared/types';
import { doc, getDoc } from 'firebase/firestore';

export const getUserById = async (userId: string) => {
   const userRef = doc(db, 'users', userId);
   const userSnap = await getDoc(userRef);
   if (userSnap.exists()) {
      return userSnap.data() as IUser;
   }

   return undefined;
};
