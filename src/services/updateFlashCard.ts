import { db } from '@lib/firebase';
import { ITerm } from '@shared/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const updateFlashCard = async (
   termId: string,
   flashcardId: string,
   lexicon: string,
   definition: string
) => {
   const termRef = doc(db, 'terms', termId);

   const termSnap = await getDoc(termRef);

   if (termSnap.exists()) {
      const term = termSnap.data() as ITerm;
      const newFlashCards = term.flashcards.map((flashcard) => {
         if (flashcard.id === flashcardId) {
            return {
               ...flashcard,
               lexicon,
               definition,
            };
         }
         return flashcard;
      });

      await updateDoc(termRef, {
         flashcards: newFlashCards,
      });
   }
};
