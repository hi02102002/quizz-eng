import { db } from '@lib/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const saveTerm = async (idTerm: string, userId: string) => {
   const termRef = doc(db, 'terms', idTerm);
   await updateDoc(termRef, {
      user: arrayUnion(userId),
   });
   return idTerm;
};
