import { db } from '@lib/firebase';
import { IUser } from '@shared/types';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export const userServices = {
   getUserByUsername: async (username: string) => {
      const q = query(
         collection(db, 'users'),
         where('username', '==', username)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
         return doc.data() as IUser;
      })?.[0];
   },
   getUserById: async (userId: string) => {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
         return userSnap.data() as IUser;
      }

      return undefined;
   },
};
