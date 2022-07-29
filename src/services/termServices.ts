import { db } from '@lib/firebase';
import {
   IFlashcard,
   IGame,
   IQuestion,
   ITerm,
   ITermWithUser,
} from '@shared/types';
import { getAnswers, isUserInUsersArray, random } from '@utils';
import {
   arrayRemove,
   arrayUnion,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   limit,
   query,
   setDoc,
   Timestamp,
   updateDoc,
   where,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { userServices } from './userServices';
export const termServices = {
   createTerm: async (
      authorId: string,
      title: string,
      description: string,
      flashcards: Array<IFlashcard>,
      status: 'PUBLIC' | 'PRIVATE'
   ) => {
      const id = uuid();

      const newTerm: ITerm = {
         id,
         description,
         title,
         isSaved: false,
         numOfLexicon: flashcards.length,
         authorId,
         flashcards,
         currentIndexFlashcard: 0,
         users: [authorId],
         status,
         createdAt: Timestamp.now().toDate().toISOString(),
      };
      await setDoc(doc(db, 'terms', id), newTerm);

      return id;
   },

   updateTerm: async (
      idTerm: string,
      flashcards: Array<IFlashcard>,
      title: string,
      description: string,
      status: 'PUBLIC' | 'PRIVATE'
   ) => {
      const termRef = doc(db, 'terms', idTerm);
      await updateDoc(termRef, {
         flashcards,
         title,
         description,
         status,
      });
      return idTerm;
   },

   getTermById: async (termId: string) => {
      const termRef = doc(db, 'terms', termId);
      const termSnap = await getDoc(termRef);
      const term = termSnap.data() as ITerm;
      const user = await userServices.getUserById(term.authorId);
      return {
         ...term,
         user: {
            avatar: user?.avatar,
            username: user?.username,
            email: user?.email,
         },
      } as ITermWithUser;
   },
   getTermsByUserId: async (userId: string) => {
      const q = query(
         collection(db, 'terms'),
         where('users', 'array-contains', userId)
      );

      const querySnapshot = await getDocs(q);

      const terms: Array<ITermWithUser> = [];

      for (const doc of querySnapshot.docs) {
         const term = doc.data() as ITerm;
         const user = await userServices.getUserById(term.authorId);

         terms.push({
            ...term,
            user: {
               avatar: user?.avatar as string,
               email: user?.email as string,
               username: user?.username as string,
            },
         });
      }

      return terms;
   },
   getExplore: async (userId: string) => {
      const q = query(
         collection(db, 'terms'),
         where('status', '==', 'PUBLIC'),
         limit(10)
      );

      const querySnapshot = await getDocs(q);

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      const terms: Array<ITermWithUser> = [];

      for (const doc of querySnapshot.docs) {
         const term = doc.data() as ITerm;
         const user = await userServices.getUserById(term.authorId);

         if (
            term.authorId !== userId &&
            !isUserInUsersArray(userId, term.users)
         ) {
            terms.push({
               ...term,
               user: {
                  avatar: user?.avatar as string,
                  email: user?.email as string,
                  username: user?.username as string,
               },
            });
         }
      }
      return {
         lastVisible,
         terms,
      };
   },
   getGames: async (termId: string) => {
      const checkExist = function (id: string, gameChoices: Array<IGame>) {
         return gameChoices.some((el) => el.flashcardId === id);
      };

      const term = await termServices.getTermById(termId);
      const games: Array<IGame> = [];

      const length =
         term.flashcards.length >= 6 ? 12 : term.flashcards.length * 2;

      while (games.length !== length) {
         const randomFlashcard =
            term.flashcards[random(0, term.flashcards.length)];
         if (!checkExist(randomFlashcard.id, games)) {
            games.push({
               id: uuid(),
               flashcardId: randomFlashcard.id,
               name: randomFlashcard.definition,
               imgUrl: randomFlashcard.imgUrl,
               stat: '',
            });
            games.push({
               id: uuid(),
               flashcardId: randomFlashcard.id,
               name: randomFlashcard.lexicon,
               stat: '',
            });
         }
      }

      return games.sort(() => Math.random() - 0.5);
   },
   getQuestions: async (termId: string) => {
      const term = await termServices.getTermById(termId);

      const questions: Array<IQuestion> = [];

      for (let i = 0; i < term.flashcards.length; i++) {
         const answers: IQuestion['answers'] = [
            ...getAnswers(term, term.flashcards[i].id, {
               definition: term.flashcards[i].definition,
               answerId: term.flashcards[i].id,
               imgUrl: term.flashcards[i].imgUrl,
            }),
         ];

         questions.push({
            answers: answers,
            questionId: term.flashcards[i].id,
            term: term.flashcards[i].lexicon,
         });
      }

      return questions.sort(() => Math.random() - 0.5);
   },
   updateFlashCard: async (
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
   },
   updateIndexFlashcard: async (termId: string, index: number) => {
      const termRef = doc(db, 'terms', termId);
      await updateDoc(termRef, {
         currentIndexFlashcard: index,
      });
   },
   saveTerm: async (userId: string, termId: string) => {
      const termRef = doc(db, 'terms', termId);
      await updateDoc(termRef, {
         users: arrayUnion(userId),
      });
   },

   removeTerm: async (userId: string, termId: string) => {
      const termRef = doc(db, 'terms', termId);
      const termDoc = await getDoc(termRef);
      const term = termDoc.data() as ITerm;

      if (term.users.length === 1) {
         await deleteDoc(termRef);
      } else if (term.users.length > 1) {
         await updateDoc(termRef, {
            users: arrayRemove(userId),
         });
      }
   },
};
