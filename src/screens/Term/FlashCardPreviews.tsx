import { IStudy } from '@shared/types';
import { EffectCards, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Flashcard } from '@components';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
   flashCards: Array<IStudy>;
}

const FlashCardPreviews = ({ flashCards }: Props) => {
   const navigationPrevRef = React.useRef<HTMLButtonElement | null>(null);
   const navigationNextRef = React.useRef<HTMLButtonElement | null>(null);

   return (
      <div className="p-2">
         <Swiper
            className="h-[25rem] !overflow-visible  w-96"
            effect={'cards'}
            modules={[EffectCards, Pagination, Navigation]}
            pagination={{
               renderCustom: (swiper, current, total) => {
                  return ` 
                        ${current} / ${total}
                    `;
               },
               el: '.pagination',
               type: 'custom',
            }}
            navigation={{
               prevEl: navigationPrevRef.current,
               nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
               //@ts-ignore
               swiper.params.navigation.prevEl = navigationPrevRef.current;
               //@ts-ignore
               swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
         >
            {flashCards.map((flashCard) => {
               return (
                  <SwiperSlide
                     key={flashCard.id}
                     className="rounded-lg overflow-hidden  cursor-pointer "
                  >
                     {({ isActive }) => (
                        <Flashcard flashCard={flashCard} isActive={isActive} />
                     )}
                  </SwiperSlide>
               );
            })}
         </Swiper>
         <div className="flex items-center justify-center mt-4">
            <button
               ref={navigationPrevRef}
               className="w-[38px] h-[38px] flex items-center justify-center hover:text-[#ffcd1f] disabled:text-[#dbdfe9] transition-alls"
            >
               <AiOutlineArrowLeft className="w-5 h-5 transition-alls" />
            </button>
            <div className="pagination flex items-center justify-center !w-[60px]"></div>
            <button
               ref={navigationNextRef}
               className="w-[38px] h-[38px] flex items-center justify-center hover:text-[#ffcd1f] disabled:text-[#dbdfe9] transition-alls"
            >
               <AiOutlineArrowRight className="w-5 h-5 transition-alls" />
            </button>
         </div>
      </div>
   );
};

export default FlashCardPreviews;
