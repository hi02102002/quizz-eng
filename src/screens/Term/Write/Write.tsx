import { Button } from '@components';
import { ITermWithUser } from '@shared/types';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Swiper, { Virtual } from 'swiper';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Layout from '../Layout';
import Sidebar from './Sidebar';
import WriteItem from './WriteItem';

interface Props {
   term: ITermWithUser;
}

const Write = ({ term }: Props) => {
   const router = useRouter();
   const [infoSidebar, setInfoSidebar] = useState<{
      correct: number;
      incorrect: number;
      remaining: number;
   }>({
      remaining: term.flashcards.length,
      correct: 0,
      incorrect: 0,
   });
   const swiperRef = useRef<Swiper | null>(null);
   const [index, setIndex] = useState<number>(0);
   const [isTryAgain, setIsTryAgain] = useState<boolean>(false);

   const handleTryAgain = () => {
      setIndex(0);
      swiperRef.current?.slideTo(0, 200);
      setIsTryAgain(true);
      setInfoSidebar({
         remaining: term.flashcards.length,
         correct: 0,
         incorrect: 0,
      });
   };

   const handleNextSlide = () => {
      swiperRef.current?.slideNext(200);
      setIndex(index + 1);
   };

   const handleAnswer = (value: boolean) => {
      if (value) {
         setInfoSidebar({
            ...infoSidebar,
            correct: infoSidebar.correct + 1,
            remaining: infoSidebar.remaining - 1,
         });
         handleNextSlide();
      } else {
         setInfoSidebar({
            ...infoSidebar,
            incorrect: infoSidebar.incorrect + 1,
            remaining: infoSidebar.remaining - 1,
         });
      }
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         if (isTryAgain) {
            setIsTryAgain(false);
         }
      }, 500);
      return () => {
         clearTimeout(timer);
      };
   }, [isTryAgain]);

   return (
      <Layout
         name="Write"
         icon={
            <svg
               fill="none"
               id="mode-learn-sober"
               viewBox="0 0 32 32"
               xmlns="http://www.w3.org/2000/svg"
               className="w-8 h-8"
            >
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4147 5.08704C20.1047 5.7747 20.1047 6.88962 19.4147 7.57728L12.6438 14.3251L17.6413 19.3056L24.4122 12.5578C25.1022 11.8702 26.2209 11.8702 26.9109 12.5578C27.6009 13.2455 27.6009 14.3604 26.9109 15.0481L18.8908 23.0409C18.8535 23.0781 18.815 23.1132 18.7754 23.1463C18.5424 23.4198 18.2319 23.6389 17.8525 23.7669L7.33337 27.3149C5.70229 27.865 4.14174 26.3235 4.6793 24.6932L8.16152 14.1322C8.28872 13.7464 8.51101 13.431 8.78965 13.1953C8.82298 13.1557 8.85834 13.1171 8.89572 13.0799L16.9159 5.08704C17.6059 4.39937 18.7246 4.39937 19.4147 5.08704Z"
                  fill="#4257B2"
               ></path>
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.82453 23.8104C8.42193 23.9461 8.03656 23.5655 8.16922 23.163L10.2802 16.7595C10.4002 16.3956 10.8631 16.2857 11.1348 16.5566L15.402 20.8093C15.6724 21.0787 15.5649 21.5374 15.2027 21.6595L8.82453 23.8104Z"
                  fill="#7B89C9"
               ></path>
            </svg>
         }
         termId={term.id}
      >
         <div className="flex gap-4 md:flex-row flex-col">
            <Sidebar
               correct={infoSidebar.correct}
               incorrect={infoSidebar.incorrect}
               remaining={infoSidebar.remaining}
               total={term.flashcards.length}
            />
            <div
               style={{
                  display: index === term.flashcards.length ? 'block' : 'none',
               }}
               className="w-full"
            >
               <div className="p-10 rounded bg-white w-full">
                  <h3 className="text-3xl font-bold text-center mb-6">
                     Result
                  </h3>
                  <div className="flex flex-col space-y-6">
                     <div className="flex items-center justify-between text-xl font-semibold text-[#23b26d]">
                        <span>Correct</span>
                        <div className="flex items-center space-x-4">
                           <span>{infoSidebar.correct}</span>
                           <span className="w-16 text-right">
                              {Math.floor(
                                 (infoSidebar.correct /
                                    term.flashcards.length) *
                                    100
                              )}
                              %
                           </span>
                        </div>
                     </div>
                     <div className="flex items-center justify-between text-xl font-semibold  text-[#ff725b]">
                        <span>Incorrect</span>
                        <div className="flex items-center space-x-4">
                           <span>{infoSidebar.incorrect}</span>
                           <span className="w-16 text-right">
                              {Math.floor(
                                 (infoSidebar.incorrect /
                                    term.flashcards.length) *
                                    100
                              )}
                              %
                           </span>
                        </div>
                     </div>
                     <div className="flex items-center justify-between text-xl font-semibold ">
                        <span>Overall Progress</span>
                        <div className="flex items-center space-x-4">
                           <span>
                              {infoSidebar.correct} / {term.flashcards.length}
                           </span>
                           <span className="w-16 text-right">
                              {Math.floor(
                                 (infoSidebar.correct /
                                    term.flashcards.length) *
                                    100
                              )}
                              %
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex items-center justify-center mt-6">
                  <Button
                     typeBtn="primary"
                     className="!min-h-[42px] !min-w-[200px] justify-center"
                     onClick={handleTryAgain}
                  >
                     Try again
                  </Button>
               </div>
            </div>
            <div
               className="overflow-x-hidden"
               style={{
                  display: index === term.flashcards.length ? 'none' : 'block',
               }}
            >
               <SwiperReact
                  className="h-full"
                  onSwiper={(swiper) => {
                     swiperRef.current = swiper;
                  }}
                  allowTouchMove={false}
                  simulateTouch={false}
                  modules={[Virtual]}
                  virtual
               >
                  {term.flashcards.map((flashcard, index) => {
                     return (
                        <SwiperSlide key={flashcard.id} virtualIndex={index}>
                           <WriteItem
                              flashcard={flashcard}
                              onAnswer={handleAnswer}
                              onNext={handleNextSlide}
                              isTryAgain={isTryAgain}
                           />
                        </SwiperSlide>
                     );
                  })}
               </SwiperReact>
            </div>
         </div>
      </Layout>
   );
};

export default Write;
