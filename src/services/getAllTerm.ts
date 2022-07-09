import { db } from '@lib/firebase';
import { IStudyModuleWithUser } from '@shared/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUser } from './getUser';

export const getAllTerm = async (userId: string) => {
   const q = query(collection(db, 'terms'), where('userId', '==', userId));

   const user = await getUser(userId);

   const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map((doc) => {
      return {
         ...doc.data(),
         avatar: user?.avatar as string,
         email: user?.email,
         username: user?.username,
      } as IStudyModuleWithUser;
   });
};
