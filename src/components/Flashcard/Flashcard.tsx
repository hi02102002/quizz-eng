/* eslint-disable @next/next/no-img-element */
import { handleTextToSpeed } from '@services';
import { IStudy } from '@shared/types';
import { useEffect, useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';

interface Props {
   flashCard: IStudy;
   isActive: boolean;
   isDetail?: boolean;
   isReverser?: boolean;
}

const FlashCard = ({ flashCard, isActive, isReverser, isDetail }: Props) => {
   const [isBack, setIsBack] = useState<boolean>(false);

   useEffect(() => {
      if (!isActive) {
         setIsBack(false);
      }
   }, [isActive]);

   useEffect(() => {
      if (isBack && isDetail) {
         handleTextToSpeed(flashCard.lexicon);
      }
   }, [isBack, flashCard.lexicon, isDetail]);

   return (
      <div
         className="h-full bg-transparent  rounded-lg select-none"
         style={{
            perspective: '1000px',
         }}
         onClick={() => {
            if (isActive) {
               setIsBack(!isBack);
            }
         }}
      >
         <div
            className="relative w-full h-full transition-transform duration-500 shadow-card  "
            style={{
               transformStyle: 'preserve-3d',
               transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
         >
            <div
               className="absolute w-full h-full text-3xl font-medium bg-white rounded-lg flex items-center justify-center p-4 text-center"
               style={{
                  backfaceVisibility: 'hidden',
               }}
            >
               {isReverser ? (
                  <>
                     {flashCard.imgUrl && (
                        <div className="max-w-[40%]">
                           <img
                              src={flashCard.imgUrl}
                              alt=""
                              className="w-full object-contain h-full"
                           />
                        </div>
                     )}
                     <span className="absolute top-4 left-4 text-sm text-[#939bb4] font-semibold">
                        Definition
                     </span>
                     <span>{flashCard.definition}</span>
                  </>
               ) : (
                  <>
                     <span className="absolute top-4 left-4 text-sm text-[#939bb4] font-semibold">
                        Term
                     </span>
                     {flashCard.lexicon}
                  </>
               )}
            </div>
            <div
               className="absolute w-full h-full text-3xl font-medium bg-white  rounded-lg flex items-center justify-center space-x-2 p-4 text-center"
               style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
               }}
            >
               {isReverser ? (
                  <>
                     <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <span className="text-sm text-[#939bb4] font-semibold">
                           Term
                        </span>
                        <button
                           className="h-10 w-10 flex items-center justify-center hover:bg-[#d9dde8] transition-all text-[#586380] rounded-full"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleTextToSpeed(flashCard.lexicon);
                           }}
                        >
                           <FiVolume2 className=" w-5 h-5" />
                        </button>
                     </div>
                     {flashCard.lexicon}
                  </>
               ) : (
                  <>
                     {flashCard.imgUrl && (
                        <div className="max-w-[40%]">
                           <img
                              src={flashCard.imgUrl}
                              alt=""
                              className="w-full object-contain h-full"
                           />
                        </div>
                     )}
                     <span className="absolute top-4 left-4 text-sm text-[#939bb4] font-semibold">
                        Definition
                     </span>
                     <span>{flashCard.definition}</span>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default FlashCard;
