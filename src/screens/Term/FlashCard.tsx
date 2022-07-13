/* eslint-disable @next/next/no-img-element */
import { IStudy } from '@shared/types';
import { useEffect, useState } from 'react';

interface Props {
   flashCard: IStudy;
   isActive: boolean;
}

const FlashCard = ({ flashCard, isActive }: Props) => {
   const [isBack, setIsBack] = useState<boolean>(false);

   useEffect(() => {
      if (!isActive) {
         setIsBack(false);
      }
   }, [isActive]);

   return (
      <div
         className="h-full bg-transparent   overflow-hidden rounded-lg select-none"
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
               {flashCard.lexicon}
            </div>
            <div
               className="absolute w-full h-full text-3xl font-medium bg-white  rounded-lg flex items-center justify-center space-x-2 p-4 text-center"
               style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
               }}
            >
               {flashCard.imgUrl && (
                  <div className="max-w-[40%]">
                     <img
                        src={flashCard.imgUrl}
                        alt=""
                        className="w-full object-contain h-full"
                     />
                  </div>
               )}
               <span>{flashCard.definition}</span>
            </div>
         </div>
      </div>
   );
};

export default FlashCard;
