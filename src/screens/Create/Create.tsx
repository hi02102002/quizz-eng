import { Button, Input, Layout } from '@components';
import { storage } from '@lib/firebase';
import { termServices } from '@services';
import { IFlashcard } from '@shared/types';
import { countStudySetHaveValue } from '@utils';
import { deleteObject, ref } from 'firebase/storage';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import Study from './Study';

interface Props {
   title?: string;
   description?: string;
   flashcards?: Array<IFlashcard>;
   type: 'edit' | 'create';
   id?: string;
}

const Create = (props: Props) => {
   const [title, setTitle] = useState<string>(props.title || '');
   const [description, setDescription] = useState<string>(
      props.description || ''
   );
   const [flashcards, setFlashCards] = useState<Array<IFlashcard>>(
      props.flashcards || [
         {
            definition: '',
            id: v4(),
            lexicon: '',
            imgUrl: '',
         },
      ]
   );
   const user = useAuthUser();
   const headerRef = useRef<HTMLDivElement | null>(null);
   const router = useRouter();
   const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
   const [status, setStatus] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

   const handleChange = useCallback((input: IFlashcard, index: number) => {
      setFlashCards((prevStates) => {
         return prevStates.map((item, _index) => {
            if (_index === index) return input;
            return item;
         });
      });
   }, []);

   const handleAddCard = () => {
      setFlashCards((prevStates) => {
         return prevStates.concat({
            definition: '',
            id: v4(),
            lexicon: '',
         });
      });
   };

   const handleRemoveCard = useCallback(
      (id: string, _index: number) => {
         setFlashCards((prevStates) => {
            return prevStates.filter((studySet) => {
               return id !== studySet.id;
            });
         });

         const desertRef = ref(storage, flashcards[_index].id);
         deleteObject(desertRef)
            .then(() => {
               console.log('xoa thanh cong');
            })
            .catch((error) => {
               console.log('xoa that bai');
            });
      },
      [flashcards]
   );

   const handleCreate = useCallback(async () => {
      if (flashcards.length < 2 || title.trim().length === 0) {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
         return;
      }
      if (countStudySetHaveValue(flashcards) >= 2) {
         setLoadingCreate(true);
         const filterFlashcards = flashcards
            .filter((flashcard) => flashcard.definition && flashcard.lexicon)
            .map((flashcard, index) => {
               return {
                  ...flashcard,
                  index,
               };
            });

         const idTerm = await termServices.createTerm(
            user.id as string,
            title,
            description,
            filterFlashcards,
            status
         );
         toast('Add successfully', {
            type: 'success',
         });
         setLoadingCreate(false);
         router.push(`/term/${idTerm}`);
      } else {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
         setLoadingCreate(false);
      }
   }, [description, router, flashcards, status, title, user.id]);

   const handleUpdate = useCallback(async () => {
      if (flashcards.length < 2 || title.trim().length === 0) {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
         return;
      }
      if (countStudySetHaveValue(flashcards) >= 2) {
         setLoadingCreate(true);
         const filterFlashcards = flashcards
            .filter((flashcard) => flashcard.definition && flashcard.lexicon)
            .map((flashcard, index) => {
               return {
                  ...flashcard,
                  index,
               };
            });

         const idTerm = await termServices.updateTerm(
            props.id as string,
            filterFlashcards,
            title,
            description,
            status
         );
         toast('Edit successfully', {
            type: 'success',
         });
         setLoadingCreate(false);
         router.push(`/term/${idTerm}`);
      } else {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
         setLoadingCreate(false);
      }
   }, [props.id, description, flashcards, router, status, title]);

   useEffect(() => {
      const body = document.querySelector('body');
      if (body) {
         body.style.backgroundColor = '#f6f7fb';
      }
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         if (headerRef.current) {
            if (window.scrollY > headerRef.current.offsetTop) {
               headerRef.current.style.boxShadow =
                  '0 0.25rem 1rem 0 rgb(0 0 0 / 16%)';
               headerRef.current.style.position = 'fixed';
               headerRef.current.style.left = '0';
               headerRef.current.style.right = '0';
               headerRef.current.style.top = '0';
               headerRef.current.style.zIndex = '10000';
            } else {
               headerRef.current.style.boxShadow = 'unset';
               headerRef.current.style.position = 'unset';
               headerRef.current.style.left = 'unset';
               headerRef.current.style.right = 'unset';
               headerRef.current.style.top = 'unset';
               headerRef.current.style.zIndex = 'unset';
            }
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <Layout>
         <div className="py-6 bg-[#f6f7fb]">
            <div className="h-[6.875rem]">
               <div ref={headerRef} className=" bg-[#f6f7fb]">
                  <div className="flex items-center justify-between gap-4 h-[6.875rem]  ui-container">
                     <h2 className="text-xl font-bold">
                        {props.type === 'create' ? (
                           ' Create a new study set'
                        ) : (
                           <button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 router.back();
                              }}
                              className="flex items-center space-x-2"
                           >
                              <IoIosArrowBack className="w-6 h-6 text-[#3ccfcf]" />
                              <span>Back to set</span>
                           </button>
                        )}
                     </h2>
                     <Button
                        typeBtn="success"
                        className="!px-6 !py-3"
                        onClick={
                           props.type === 'create' ? handleCreate : handleUpdate
                        }
                        loading={loadingCreate ? 'ONLY_LOADING' : ''}
                     >
                        {props.type === 'create' ? 'Create' : 'Done'}
                     </Button>
                  </div>
               </div>
            </div>
            <div className="ui-container">
               <div className="mb-8">
                  <div className="space-y-2 max-w-[600px]">
                     <Input
                        label="Title"
                        placeholder="Enter a title, like “Biology - Chapter 22: Evolution”"
                        onChange={(e) => {
                           setTitle(e.currentTarget.value);
                        }}
                        value={title}
                     />
                     <Input
                        label="Description"
                        placeholder="Add a description..."
                        onChange={(e) => {
                           setDescription(e.currentTarget.value);
                        }}
                        value={description}
                     />
                  </div>
               </div>
               <div>
                  <ul>
                     {flashcards.map((item, index) => {
                        return (
                           <li key={item.id} className="mb-5">
                              <Study
                                 index={index + 1}
                                 value={item}
                                 onChange={(input) => {
                                    handleChange(input, index);
                                 }}
                                 onRemove={() => {
                                    handleRemoveCard(item.id, index);
                                 }}
                              />
                           </li>
                        );
                     })}
                  </ul>
                  <div className="min-h-[120px] flex items-center justify-center bg-white rounded-lg shadow-card mb-5">
                     <button
                        className="transition-all border-b-[0.3125rem] border-[#3ccfcf] pb-3 uppercase font-bold tracking-[0.075rem] text-[.9375rem] hover:text-[#ffcd1f] hover:border-b-[#ffcd1f]"
                        onClick={handleAddCard}
                     >
                        + add card
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Create;
