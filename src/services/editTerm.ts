import { db } from '@lib/firebase';
import { IStudy } from '@shared/types';
import { doc, updateDoc } from 'firebase/firestore';

export const editTerm = async (
   idTerm: string,
   flashcards: Array<IStudy>,
   title: string,
   description: string
) => {
   const termRef = doc(db, 'terms', idTerm);
   await updateDoc(termRef, {
      flashcards,
      title,
      description,
   });
   return idTerm;
};
