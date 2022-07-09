import { Button, Layout } from '@components';
import { storage } from '@lib/firebase';
import { createTerm } from '@services';
import { IStudy } from '@shared/types';
import { countStudySetHaveValue } from '@utils';
import { deleteObject, ref } from 'firebase/storage';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import Input from './components/Input';
import Study from './components/Study';

const Create = () => {
   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [studySets, setStudySets] = useState<Array<IStudy>>([
      {
         definition: '',
         id: v4(),
         lexicon: '',
         imgUrl: '',
      },
   ]);
   const user = useAuthUser();
   const headerRef = useRef<HTMLDivElement | null>(null);
   const router = useRouter();

   const handleChange = (input: IStudy, index: number) => {
      setStudySets((prevStates) => {
         return prevStates.map((item, _index) => {
            if (_index === index) return input;
            return item;
         });
      });
   };

   const handleAddCard = () => {
      setStudySets((prevStates) => {
         return prevStates.concat({
            definition: '',
            id: v4(),
            lexicon: '',
         });
      });
   };

   const handleRemoveCard = (index: number) => {
      setStudySets((prevStates) => {
         return prevStates.filter((_, _index) => {
            return index !== _index;
         });
      });
      const desertRef = ref(storage, studySets[index].id);

      deleteObject(desertRef)
         .then(() => {
            console.log('xoa thanh cong');
         })
         .catch((error) => {
            console.log('xoa that bai');
         });
   };

   const handleCreate = async () => {
      if (studySets.length < 2 || title.trim().length === 0) {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
         return;
      }
      if (countStudySetHaveValue(studySets) >= 2) {
         const filterStudySets = studySets.filter(
            (studySet) => studySet.definition && studySet.lexicon
         );
         const idTerm = await createTerm(
            user.id as string,
            title,
            description,
            filterStudySets
         );
         toast('Add successfully', {
            type: 'success',
         });
         router.push(`/${idTerm}`);
      } else {
         toast('You must enter at least two cards and title to save your set', {
            type: 'error',
         });
      }
   };

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
                  <div className="flex items-center justify-between h-[6.875rem]  ui-container">
                     <h2 className="text-xl font-bold">
                        Create a new study set
                     </h2>
                     <Button
                        typeBtn="success"
                        className="!px-6 !py-3"
                        onClick={handleCreate}
                     >
                        Create
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
                     {studySets.map((item, index) => {
                        return (
                           <li key={item.id} className="mb-5">
                              <Study
                                 index={index + 1}
                                 value={item}
                                 onChange={(input) => {
                                    handleChange(input, index);
                                 }}
                                 onRemove={() => {
                                    handleRemoveCard(index);
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
                  <div className="flex items-center justify-end">
                     <Button
                        typeBtn="success"
                        className="!py-6 !px-20 !text-lg"
                        onClick={handleCreate}
                     >
                        Create
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Create;
