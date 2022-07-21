import { Button } from '@components';
import { ROUTES } from '@constants';
import { IQuestion } from '@shared/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Swiper, { Virtual } from 'swiper';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Question from './Question';

interface Props {
   questions: Array<IQuestion>;
   termId: string;
}

const Questions = ({ questions, termId }: Props) => {
   const router = useRouter();
   const [showButtonNext, setShowButtonNext] = useState<boolean>(false);
   const swiperRef = useRef<Swiper | null>(null);
   const [countRightAnswer, setCountRightAnswer] = useState<number>(0);
   const [index, setIndex] = useState<number>(0);
   const [isTryAgain, setIsTryAgain] = useState<boolean>(false);

   const handelWhenRightAnswer = (value: boolean) => {
      setShowButtonNext(!value);
      if (value) {
         setTimeout(() => {
            swiperRef.current?.slideNext(200);
            setIndex(index + 1);
         }, 2000);
         setCountRightAnswer(countRightAnswer + 1);
      }
   };

   const handleNextButton = () => {
      swiperRef.current?.slideNext(200);
      setShowButtonNext(false);
      setIndex(index + 1);
   };

   const handleTryAgain = () => {
      setIndex(0);
      setCountRightAnswer(0);
      swiperRef.current?.slideTo(0, 0);
      setIsTryAgain(true);
   };

   useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isTryAgain) {
         timer = setTimeout(() => {
            setIsTryAgain(false);
         }, 500);
      }

      return () => {
         timer && clearTimeout(timer);
      };
   }, [isTryAgain]);

   return (
      <div>
         <div className="h-header bg-white border-b border-[#edeff4] flex items-center relative overflow-hidden">
            <div className="flex items-center justify-between px-4 w-full relative">
               <div className="flex items-center space-x-4">
                  <svg
                     fill="none"
                     id="mode-assistant-sober"
                     viewBox="0 0 32 32"
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-8 h-8"
                  >
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.9086 5.87034C12.8152 4.45754 10.7219 4.15468 9.2313 5.17135C8.12752 5.92419 7.64455 7.20187 7.90641 8.39721C4.35016 11.7566 3.4588 17.0759 6.10504 21.3787C8.71907 25.629 13.9641 27.5542 18.7775 26.4241C19.9188 27.5794 21.816 27.7702 23.1967 26.8284C24.7013 25.8022 25.0489 23.8019 23.9439 22.3742C22.8505 20.9614 20.7572 20.6585 19.2666 21.6752C18.4762 22.2143 18.0034 23.0231 17.8957 23.8793C14.2913 24.6339 10.4375 23.1546 8.51336 20.026C6.60107 16.9167 7.15282 13.0878 9.61222 10.551C10.7078 11.1025 12.0874 11.0571 13.1614 10.3246C14.666 9.29835 15.0136 7.2981 13.9086 5.87034ZM10.9493 7.46653C11.1395 7.33684 11.4062 7.38432 11.5319 7.5468C11.6461 7.69427 11.6194 7.90933 11.4432 8.02949C11.2533 8.15903 10.9866 8.11164 10.8608 7.94911C10.7466 7.80158 10.7734 7.58654 10.9493 7.46653ZM20.9846 23.9703C21.1747 23.8407 21.4414 23.8881 21.5672 24.0506C21.6813 24.1981 21.6546 24.4131 21.4785 24.5333C21.2885 24.6628 21.0218 24.6155 20.896 24.4529C20.7818 24.3054 20.8086 24.0904 20.9846 23.9703Z"
                        fill="#4257B2"
                     ></path>
                     <path
                        d="M17.0167 5.21914C16.2936 5.16602 15.6318 5.67451 15.5717 6.39452C15.5115 7.11705 16.0846 7.71927 16.8095 7.77252C17.2761 7.80681 17.7394 7.87615 18.1945 7.9797C18.8997 8.14016 19.6341 7.73747 19.8142 7.03999C19.9961 6.33542 19.5311 5.65062 18.8206 5.48895C18.2279 5.35409 17.6246 5.26379 17.0167 5.21914Z"
                        fill="#7B89C9"
                     ></path>
                     <path
                        d="M23.2332 7.51131C22.6569 7.08114 21.8192 7.1672 21.3551 7.71525C20.8818 8.27409 20.9854 9.08847 21.5723 9.52648C21.9364 9.79828 22.2767 10.0975 22.5901 10.422C23.0892 10.9387 23.9306 10.9758 24.4779 10.5099C25.0357 10.0351 25.0804 9.21572 24.5716 8.68884C24.1591 8.26174 23.7115 7.86829 23.2332 7.51131Z"
                        fill="#7B89C9"
                     ></path>
                     <path
                        d="M27.0164 12.7151C26.7913 12.0315 26.0337 11.672 25.3398 11.8734C24.6394 12.0767 24.2206 12.7892 24.4485 13.4813C24.5859 13.8986 24.6865 14.3245 24.7499 14.7554C24.855 15.4694 25.5459 15.9396 26.2642 15.8465C26.9857 15.7529 27.5207 15.1183 27.415 14.4C27.3311 13.8301 27.1981 13.2668 27.0164 12.7151Z"
                        fill="#7B89C9"
                     ></path>
                     <path
                        d="M26.1282 17.3798C25.4331 17.1825 24.6777 17.5465 24.4571 18.2316C24.3224 18.65 24.1523 19.0579 23.9483 19.4509C23.6118 20.0995 23.9073 20.8682 24.5719 21.1721C25.2276 21.4719 26.0304 21.2228 26.3613 20.585C26.6293 20.0685 26.8529 19.5324 27.0301 18.9822C27.2534 18.2887 26.8298 17.5789 26.1282 17.3798Z"
                        fill="#7B89C9"
                     ></path>
                  </svg>
                  <span className="text-[#586380] text-base font-semibold">
                     Flashcards
                  </span>
               </div>
               <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center flex-col text-center text-[#586380] text-base font-semibold ">
                  <span className="pagination-header"></span>
                  <Link href="/">
                     <a className="hover:text-mainColor transition-all">
                        Tuan 1
                     </a>
                  </Link>
               </div>
               <Button
                  className="w-10 h-10 flex items-center justify-center border-[#d9dde8] !border border-solid !p-0 hover:bg-[#d9dde8] transition-all "
                  onClick={() => {
                     router.push(`${ROUTES.TERM}/${termId}`);
                  }}
               >
                  <MdClose className="w-5 h-5 text-[#586380 ]" />
               </Button>
            </div>
         </div>
         <div className="ui-container h-full !py-10  w-full">
            <div
               style={{
                  display: index === questions.length ? 'block' : 'none',
               }}
            >
               <div className="flex flex-col bg-white p-6 rounded">
                  <h4 className="text-3xl font-bold mb-8 text-center ">
                     📣📣 Keep up the good work. 📣📣
                  </h4>
                  <div className="mb-2 font-semibold text-[#646f90]">
                     {countRightAnswer} / {questions.length} Terms
                  </div>
                  <div>
                     <div className="h-4 w-full rounded overflow-hidden bg-[#f6f7fb]">
                        <div
                           className="h-full bg-[#65c999] rounded"
                           style={{
                              width: `${
                                 (countRightAnswer / questions.length) * 100
                              }%`,
                           }}
                        ></div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-center mt-6">
                  <Button
                     typeBtn="primary"
                     className="!py-3 !px-6"
                     onClick={handleTryAgain}
                  >
                     Try again
                  </Button>
               </div>
            </div>
            <div
               className="flex items-center justify-center "
               style={{
                  display: index === questions.length ? 'none' : 'flex',
               }}
            >
               <SwiperReact
                  className="h-[29.25rem] max-w-[52.5rem]"
                  spaceBetween={16}
                  allowTouchMove={false}
                  simulateTouch={false}
                  modules={[Virtual]}
                  virtual
                  onSwiper={(swiper) => {
                     swiperRef.current = swiper;
                  }}
               >
                  {questions.map((question, index) => {
                     return (
                        <SwiperSlide
                           key={question.questionId}
                           className="p-1"
                           virtualIndex={index}
                        >
                           {({ isActive }) => {
                              return (
                                 <Question
                                    question={question}
                                    onIsRightAnswer={handelWhenRightAnswer}
                                    isActive={isActive}
                                    isTryAgain={isTryAgain}
                                 />
                              );
                           }}
                        </SwiperSlide>
                     );
                  })}
               </SwiperReact>
            </div>
         </div>
         <div
            className="h-header bg-white border-t border-[#edeff4] fixed left-0 bottom-[-100%] right-0 shadow-card transition-all flex items-center justify-center"
            style={{
               bottom: showButtonNext ? '0' : '-100%',
               boxShadow: '0 -0.25rem 1rem rgb(48 53 69 / 8%)',
            }}
         >
            <Button
               typeBtn="primary"
               className="!py-3 !px-6"
               onClick={handleNextButton}
            >
               Continue
            </Button>
         </div>
      </div>
   );
};

export default Questions;
