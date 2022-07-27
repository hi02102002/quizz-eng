import { Button, Layout } from '@components';
import { ROUTES } from '@constants';
import { handleTextToSpeed, termServices } from '@services';
import { IFlashcard, ITermWithUser } from '@shared/types';
import { isUserInUsersArray } from '@utils';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Card from './Card';
import FlashCardPreviews from './FlashCardPreviews';
import Sidebar from './Sidebar';

interface Props {
   term: ITermWithUser;
}

const Term = (props: Props) => {
   const user = useAuthUser();
   const [flashCards, setFlashCards] = useState<Array<IFlashcard>>(
      props.term.flashcards
   );
   const router = useRouter();
   const [term, setTerm] = useState<ITermWithUser>(props.term);

   const handleUpdate = useCallback(
      async (
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
         await termServices.updateFlashCard(
            termId,
            currentFlashcard.id,
            lexicon,
            definition
         );
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
      },
      []
   );

   const handleRemoveTerm = useCallback(async () => {
      await termServices.removeTerm(user.id as string, term.id);
      router.push(ROUTES.HOME);
   }, [router, term.id, user.id]);

   const handleSaveTerm = useCallback(async () => {
      await termServices.saveTerm(user.id as string, term.id);
      setTerm({
         ...term,
         users: term.users.concat(user.id as string),
      });
   }, [term, user.id]);

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
                        {isUserInUsersArray(user.id as string, term.users) ? (
                           <>
                              <Button
                                 typeBtn="dangerous"
                                 onClick={handleRemoveTerm}
                              >
                                 <FiTrash className="w-4 h-4 mr-2" />
                                 Remove
                              </Button>
                              {term.authorId === user.id && (
                                 <Button
                                    typeBtn="primary"
                                    onClick={() => {
                                       router.push(`${ROUTES.EDIT}/${term.id}`);
                                    }}
                                 >
                                    <FiEdit className="w-4 h-4 mr-2" />
                                    Edit
                                 </Button>
                              )}
                           </>
                        ) : (
                           <Button typeBtn="primary" onClick={handleSaveTerm}>
                              <BsBookmark className="w-4 h-4 mr-2" />
                              Save
                           </Button>
                        )}
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
                                    users={term.users}
                                    authorId={term.authorId}
                                 />
                              </li>
                           );
                        })}
                     </ul>
                     <div className="flex items-center justify-center">
                        {isUserInUsersArray(user.id as string, term.users) &&
                           term.authorId === user.id && (
                              <Button
                                 typeBtn="primary"
                                 className="mt-8 !px-8 !py-5"
                                 onClick={() => {
                                    router.push(`${ROUTES.EDIT}/${term.id}`);
                                 }}
                              >
                                 Add or remove Terms
                              </Button>
                           )}
                        {!isUserInUsersArray(user.id as string, term.users) &&
                           term.authorId !== user.id && (
                              <Button
                                 typeBtn="primary"
                                 className="mt-8 !px-8 !py-5"
                                 onClick={handleSaveTerm}
                              >
                                 Save
                              </Button>
                           )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Term;
