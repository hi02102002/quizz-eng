import { Input } from '@components';
import { IFlashcard } from '@shared/types';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiVolume2 } from 'react-icons/fi';

interface Props {
   flashCard: IFlashcard;
   onUpdate: (term: string, definition: string) => void;
   onTextToSpeed: () => void;
}

const Card = ({ flashCard, onUpdate, onTextToSpeed }: Props) => {
   const [term, setTerm] = useState<string>(flashCard.lexicon);
   const [definition, setDefinition] = useState<string>(flashCard.definition);
   const [isEdit, setIsEdit] = useState<boolean>(false);

   const handleUpdate = () => {
      if (isEdit) {
         onUpdate(term, definition);
         setIsEdit(false);
      } else {
         setIsEdit(!isEdit);
      }
   };

   return (
      <div className="p-4 bg-white shadow-card rounded">
         <div className="flex">
            <div className="flex md:items-center md:flex-row flex-col w-[calc(100%_-_6.75rem)] h-full ">
               <div
                  className="w-full md:w-[40%] md:px-8 px-2 h-full"
                  style={{
                     borderRight: '.125rem solid #f7f7fb',
                  }}
               >
                  {isEdit ? (
                     <Input
                        label="Term"
                        onChange={(e) => {
                           setTerm(e.currentTarget.value);
                        }}
                        value={term}
                     />
                  ) : (
                     <span>{flashCard.lexicon}</span>
                  )}
               </div>
               <div className="flex space-x-4 w-full md:w-[60%] md:px-8 px-2  items-center">
                  <div className="w-[200px]">
                     {isEdit ? (
                        <Input
                           label="Definition"
                           onChange={(e) => {
                              setDefinition(e.currentTarget.value);
                           }}
                           value={definition}
                        />
                     ) : (
                        <span className="block md:text-center ">
                           {flashCard.definition}
                        </span>
                     )}
                  </div>

                  <div>
                     {flashCard.imgUrl && (
                        <Image
                           src={flashCard.imgUrl}
                           alt={flashCard.lexicon}
                           height={100}
                           width={120}
                           objectFit="contain"
                        />
                     )}
                  </div>
               </div>
            </div>
            <div className="flex-1">
               <div className="flex items-center space-x-2">
                  <button
                     className="h-10 w-10 flex items-center justify-center hover:bg-[#d9dde8] transition-all text-[#586380] rounded-full"
                     onClick={onTextToSpeed}
                  >
                     <FiVolume2 className=" w-5 h-5" />
                  </button>
                  <button
                     className="h-10 w-10 flex items-center justify-center hover:bg-[#d9dde8] transition-all text-[#586380] rounded-full"
                     onClick={handleUpdate}
                     style={{
                        color: isEdit ? '#ffcd1f' : undefined,
                     }}
                  >
                     <AiOutlineEdit className=" w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Card;
