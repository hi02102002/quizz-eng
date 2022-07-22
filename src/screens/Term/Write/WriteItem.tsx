/* eslint-disable @next/next/no-img-element */
import { Button, Input } from '@components';
import { IFlashcard } from '@shared/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
   flashcard: IFlashcard;
   onAnswer: (value: boolean) => void;
   onNext: () => void;
   isTryAgain: boolean;
}

const WriteItem = ({ flashcard, onAnswer, onNext, isTryAgain }: Props) => {
   const [inputAnswer, setInputAnswer] = useState<string>('');
   const [isRight, setIsRight] = useState<boolean>(false);
   const [isChecked, setIsChecked] = useState<boolean>(false);
   const [isDontKnow, setIsDontKnow] = useState<boolean>(false);
   const [inputWhenDontKnow, setInputWhenDontKnow] = useState<string>('');

   const handleAnswer = () => {
      setIsChecked(true);
      if (inputAnswer.trim() === flashcard.lexicon) {
         setIsRight(true);
      } else {
         setIsRight(false);
      }
   };

   const handleDontKnow = () => {
      setIsChecked(true);
      setIsDontKnow(true);
      setIsRight(false);
   };

   useEffect(() => {
      if (isChecked && isRight) {
         onAnswer(true);
      } else if (isChecked && !isRight) {
         onAnswer(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isChecked, isRight]);

   useEffect(() => {
      let timer: NodeJS.Timer;
      if (inputWhenDontKnow.trim() === flashcard.lexicon && isDontKnow) {
         timer = setTimeout(onNext, 800);
      }

      return () => {
         timer && clearTimeout(timer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [inputWhenDontKnow, flashcard.lexicon, isDontKnow]);

   useEffect(() => {
      if (isTryAgain) {
         setInputAnswer('');
         setInputWhenDontKnow('');
         setIsChecked(false);
         setIsDontKnow(false);
         setIsRight(false);
      }
   }, [isTryAgain]);

   const renderContent = () => {
      // no checked r va no sai neu no sai co nghia la no biet nhung ma dap an do la sai
      if (isChecked && !isRight && !isDontKnow) {
         return (
            <div>
               <div className="flex items-center space-x-4">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="64"
                     height="64"
                     viewBox="0 0 64 64"
                     className="w-9 h-9"
                  >
                     <circle fill="#FDCA47" cx="32" cy="32" r="30"></circle>
                     <path
                        fill="#F9B700"
                        d="M51.654 9.346A29.869 29.869 0 0 1 59 29c0 16.569-13.432 30-30 30a29.871 29.871 0 0 1-19.654-7.345C14.846 57.99 22.952 62 32 62c16.568 0 30-13.431 30-30 0-9.047-4.012-17.152-10.346-22.654z"
                     ></path>
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#FFE8BB"
                        d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"
                     ></path>
                     <circle
                        fill="#302C3B"
                        cx="42.387"
                        cy="24.677"
                        r="4.999"
                     ></circle>
                     <path
                        fill="#302C3B"
                        d="M18.867 23.748a5 5 0 1 0 1.735 9.849 5 5 0 0 0-1.735-9.849zm25.389 17.236c-6.754-1.632-16.871-.215-21.526 6.138-.834 1.137-.022 2.335 1.144 1.559 4.455-2.965 13.092-4.799 19.311-3.322 2.375.564 3.557-3.748 1.071-4.375z"
                     ></path>
                  </svg>
                  <h4 className="text-3xl text-[#ff725b] font-bold">
                     Study this one!
                  </h4>
               </div>
               <div className="mt-10 space-y-6">
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        DEFINITION
                     </span>
                     <span>{flashcard.definition}</span>
                     {flashcard.imgUrl && (
                        <Image
                           src={flashcard.imgUrl}
                           alt=""
                           width={64}
                           height={64}
                           objectFit="cover"
                           className="rounded"
                        />
                     )}
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        YOU SAID
                     </span>
                     <span className="text-[#ff725b]">{inputAnswer}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        CORRECT ANSWER
                     </span>
                     <span className="text-[#23b26d]">{flashcard.lexicon}</span>
                  </div>
                  <div className="flex items-center justify-center">
                     <Button
                        typeBtn="success"
                        className="
               !min-h-[42px]"
                        onClick={onNext}
                     >
                        Continue
                     </Button>
                  </div>
               </div>
            </div>
         );
         // no checked r va no khong biet va neu no k biet thi dap an chac chan sai
      } else if (isChecked && isDontKnow && !isRight) {
         return (
            <div>
               <div>
                  <h4 className="text-3xl text-[#ff725b] font-bold">
                     Copy answer
                  </h4>
               </div>
               <div className="mt-10 space-y-6">
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        PROMPT
                     </span>
                     <span>{flashcard.definition}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        CORRECT
                     </span>
                     <span>{flashcard.lexicon}</span>
                  </div>
                  <div className="mt-10">
                     <Input
                        label="type the answer"
                        onChange={(e) => {
                           setInputWhenDontKnow(e.currentTarget.value);
                        }}
                        value={inputWhenDontKnow}
                     />
                  </div>
               </div>
            </div>
         );
      } else {
         return (
            <div>
               <div className="pb-10 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                     <span>{flashcard.definition}</span>
                     <button
                        className="text-[#3ccfcf] font-semibold"
                        onClick={handleDontKnow}
                     >
                        Don&apos;t know
                     </button>
                  </div>
                  {flashcard.imgUrl && <img src={flashcard.imgUrl} alt="" />}
               </div>
               <div className="flex items-center space-x-8 mt-10">
                  <Input
                     label="type the answer"
                     onChange={(e) => {
                        setInputAnswer(e.currentTarget.value);
                     }}
                     value={inputAnswer}
                  />
                  <Button
                     typeBtn="success"
                     className="h-[48px] min-w-[6.25rem] justify-center"
                     onClick={handleAnswer}
                  >
                     Answer
                  </Button>
               </div>
            </div>
         );
      }
   };

   return (
      <div className="p-10 rounded bg-white h-full">
         {/* {isChecked && !isRight ? (
            <div>
               <div className="flex items-center space-x-4">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="64"
                     height="64"
                     viewBox="0 0 64 64"
                     className="w-9 h-9"
                  >
                     <circle fill="#FDCA47" cx="32" cy="32" r="30"></circle>
                     <path
                        fill="#F9B700"
                        d="M51.654 9.346A29.869 29.869 0 0 1 59 29c0 16.569-13.432 30-30 30a29.871 29.871 0 0 1-19.654-7.345C14.846 57.99 22.952 62 32 62c16.568 0 30-13.431 30-30 0-9.047-4.012-17.152-10.346-22.654z"
                     ></path>
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#FFE8BB"
                        d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"
                     ></path>
                     <circle
                        fill="#302C3B"
                        cx="42.387"
                        cy="24.677"
                        r="4.999"
                     ></circle>
                     <path
                        fill="#302C3B"
                        d="M18.867 23.748a5 5 0 1 0 1.735 9.849 5 5 0 0 0-1.735-9.849zm25.389 17.236c-6.754-1.632-16.871-.215-21.526 6.138-.834 1.137-.022 2.335 1.144 1.559 4.455-2.965 13.092-4.799 19.311-3.322 2.375.564 3.557-3.748 1.071-4.375z"
                     ></path>
                  </svg>
                  <h4 className="text-3xl text-[#ff725b] font-bold">
                     Study this one!
                  </h4>
               </div>
               <div className="mt-10 space-y-6">
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        DEFINITION
                     </span>
                     <span>{flashcard.definition}</span>
                     {flashcard.imgUrl && (
                        <Image
                           src={flashcard.imgUrl}
                           alt=""
                           width={64}
                           height={64}
                           objectFit="cover"
                           className="rounded"
                        />
                     )}
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        YOU SAID
                     </span>
                     <span className="text-[#ff725b]">{inputAnswer}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                     <span className="text-xs font-semibold text-neutral-500">
                        CORRECT ANSWER
                     </span>
                     <span className="text-[#23b26d]">{flashcard.lexicon}</span>
                  </div>
                  <div className="flex items-center justify-center">
                     <Button
                        typeBtn="success"
                        className="
                     !min-h-[42px]"
                     >
                        Continue
                     </Button>
                  </div>
               </div>
            </div>
         ) : (
            <div>
               <div className="pb-10 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                     <span>{flashcard.definition}</span>
                     <button className="text-[#3ccfcf] font-semibold">
                        Don&apos;t know
                     </button>
                  </div>
                  {flashcard.imgUrl && <img src={flashcard.imgUrl} alt="" />}
               </div>
               <div className="flex items-center space-x-8 mt-10">
                  <Input
                     label="type the answer"
                     onChange={(e) => {
                        setInputAnswer(e.currentTarget.value);
                     }}
                     value={inputAnswer}
                  />
                  <Button
                     typeBtn="success"
                     className="h-[48px] min-w-[6.25rem] justify-center"
                     onClick={handleAnswer}
                  >
                     Answer
                  </Button>
               </div>
            </div>
         )} */}
         {renderContent()}
      </div>
   );
};

export default WriteItem;
