import { db } from '@lib/firebase';
import { IStudy, IStudyModule } from '@shared/types';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export const createTerm = async (
   userId: string,
   title: string,
   description: string,
   studySets: Array<IStudy>
) => {
   const idTerm = uuid();

   const newTerm: IStudyModule = {
      id: idTerm,
      description,
      title,
      isSaved: false,
      numOfLexicon: studySets.length,
      userId,
   };

   await setDoc(doc(db, 'terms', idTerm), newTerm);
   for (let i = 0; i < studySets.length; i++) {
      const idStudySet = uuid();
      await setDoc(doc(db, `terms/${idTerm}/studySets`, idStudySet), {
         ...studySets[i],
         id: idStudySet,
      });
   }

   return idTerm;
};
