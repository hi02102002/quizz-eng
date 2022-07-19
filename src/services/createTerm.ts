import { db } from '@lib/firebase';
import { IStudy } from '@shared/types';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export const createTerm = async (
   userId: string,
   title: string,
   description: string,
   studySets: Array<IStudy>
) => {
   const id = uuid();

   const newTerm = {
      id,
      description,
      title,
      isSaved: false,
      numOfLexicon: studySets.length,
      userId,
      flashcards: studySets,
      currentIndexFlashcard: 0,
   };
   await setDoc(doc(db, 'terms', id), newTerm);

   return id;
};
