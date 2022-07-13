import { db } from '@lib/firebase';
import { IUser } from '@shared/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getUserByUsername = async (username: string) => {
   const q = query(collection(db, 'users'), where('username', '==', username));
   const querySnapshot = await getDocs(q);

   return querySnapshot.docs.map((doc) => {
      return doc.data() as IUser;
   })?.[0];
};
