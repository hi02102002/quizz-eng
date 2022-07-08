import { db } from '@lib/firebase';
import { IStudyModuleWithUser } from '@shared/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getAllTerm = async (userId: string) => {
   const q = query(collection(db, 'terms'), where('userId', '==', userId));
   const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map((doc) => {
      return doc.data() as IStudyModuleWithUser;
   });
};
