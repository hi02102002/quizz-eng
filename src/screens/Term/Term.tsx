import { Button, Layout } from '@components';
import { ROUTES } from '@constants';
import { db } from '@lib/firebase';
import { handleTextToSpeed, updateFlashCard } from '@services';
import { IFlashcard, ITermWithUser } from '@shared/types';
import { deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Card from './Card';
import FlashCardPreviews from './FlashCardPreviews';
import Sidebar from './Sidebar';

interface Props {
   term: ITermWithUser;
}

const Term = ({ term }: Props) => {
   const [flashCards, setFlashCards] = useState<Array<IFlashcard>>(
      term.flashcards
   );
   const router = useRouter();

   const handleUpdate = async (
      termId: string,
      currentFlashcard: IFlashcard,
      lexicon: string,
      definition: string
   ) => {
      if (
         lexicon.trim() === currentFlashcard.lexicon &&
         definition.trim() === currentFlashcard.definition
      ) {
         return;
      }
      await updateFlashCard(termId, currentFlashcard.id, lexicon, definition);
      setFlashCards((prevStates) => {
         return prevStates.map((flashcard) => {
            if (flashcard.id === currentFlashcard.id) {
               return {
                  ...flashcard,
                  lexicon,
                  definition,
               };
            }
            return flashcard;
         });
      });
   };

   const handleRemoveTerm = async () => {
      await deleteDoc(doc(db, 'terms', term.id));
      router.push(ROUTES.HOME);
   };

   return (
      <Layout>
         <div className="md:p-10 p-6 flex-1 overflow-x-hidden">
            <div className="space-y-2">
               <h1 className="text-[32px] font-bold ">{term.title}</h1>
               <span className="font-semibold text-[#586380] text-sm">
                  {term.description || 'No description.'}
               </span>
            </div>
            <div className="mt-8">
               <div className="lg:mr-[21.25rem] ">
                  <div className="flex md:flex-row flex-col-reverse md:space-x-14">
                     <Sidebar termId={term.id} />
                     <div className="flex-1 max-w-[46rem]">
                        <FlashCardPreviews flashCards={flashCards} />
                     </div>
                  </div>
                  <div className="flex items-center justify-between py-8 md:flex-row flex-col gap-4">
                     <div className="flex items-center space-x-4">
                        <Image
                           src={term.user.avatar}
                           alt={term.user.username}
                           width={50}
                           height={50}
                           className="rounded-full"
                        />
                        <div>
                           <span className="text-[10px] text-neutral-500">
                              Created by
                           </span>
                           <h5 className="text-[##282e3e] text-sm font-bold">
                              {term.user.username}
                           </h5>
                        </div>
                     </div>
                     <div className="flex items-center space-x-4">
                        <Button typeBtn="dangerous" onClick={handleRemoveTerm}>
                           <FiTrash className="w-4 h-4 mr-2" />
                           Remove
                        </Button>
                        <Button
                           typeBtn="primary"
                           onClick={() => {
                              router.push(`${ROUTES.EDIT}/${term.id}`);
                           }}
                        >
                           <FiEdit className="w-4 h-4 mr-2" />
                           Edit
                        </Button>
                     </div>
                  </div>
                  <div className="pt-[40px]">
                     <div className="mb-6">
                        <h3 className="text-lg font-bold">
                           Terms in this set ({term.numOfLexicon})
                        </h3>
                     </div>
                     <ul className="space-y-3">
                        {flashCards.map((flashCard) => {
                           return (
                              <li key={flashCard.id}>
                                 <Card
                                    flashCard={flashCard}
                                    onUpdate={async (lexicon, definition) => {
                                       await handleUpdate(
                                          term.id,
                                          flashCard,
                                          lexicon,
                                          definition
                                       );
                                    }}
                                    onTextToSpeed={() => {
                                       handleTextToSpeed(flashCard.lexicon);
                                    }}
                                 />
                              </li>
                           );
                        })}
                     </ul>
                     <div className="flex items-center justify-center">
                        <Button
                           typeBtn="primary"
                           className="mt-8 !px-8 !py-5"
                           onClick={() => {
                              router.push(`${ROUTES.EDIT}/${term.id}`);
                           }}
                        >
                           Add or remove Terms
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Term;
