import { IAnswer, IQuestion } from '@shared/types';
import { handleTextToSpeed } from '@utils';
import { useCallback, useEffect, useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import Answer from './Answer';

interface Props {
   question: IQuestion;
   onIsRightAnswer: (value: boolean) => void;
   isActive: boolean;
   isTryAgain: boolean;
}

const Question = ({
   question,
   onIsRightAnswer,
   isActive,
   isTryAgain,
}: Props) => {
   const [chooseAnswer, setChooseAnswer] = useState<string>('');
   const [isChoose, setIsChoose] = useState<boolean>(false);

   const handleChoose = useCallback((answerId: string) => {
      setChooseAnswer(answerId);
      setIsChoose(true);
   }, []);

   useEffect(() => {
      if (isChoose) {
         if (chooseAnswer === question.questionId) {
            onIsRightAnswer(true);
         } else {
            onIsRightAnswer(false);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [chooseAnswer, question.questionId, isChoose]);

   useEffect(() => {
      if (isActive) {
         handleTextToSpeed(question.term);
      }
   }, [isActive, question.term]);

   useEffect(() => {
      if (isTryAgain) {
         setChooseAnswer('');
         setIsChoose(false);
      }
   }, [isTryAgain]);

   const isCorrect = useCallback(
      (answer: IAnswer) => {
         if (isChoose) {
            if (answer.answerId === question.questionId) {
               return {
                  correct: true,
                  color: '#23b26d',
               };
            } else if (
               answer.answerId === chooseAnswer &&
               answer.answerId !== question.questionId
            ) {
               return {
                  correct: false,
                  color: '#ff725b',
               };
            }

            return undefined;
         }

         return undefined;
      },
      [isChoose, chooseAnswer, question.questionId]
   );

   return (
      <div className="h-full bg-white shadow-card rounded p-4 flex flex-col">
         <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
               <span className="text-sm font-semibold text-neutral-500">
                  Term
               </span>
               <button
                  className="h-10 w-10 flex items-center justify-center hover:bg-[#d9dde8] transition-all text-[#586380] rounded-full"
                  onClick={(e) => {
                     e.stopPropagation();
                     handleTextToSpeed(question.term);
                  }}
               >
                  <FiVolume2 className=" w-5 h-5" />
               </button>
            </div>
            <h5 className="text-xl">{question.term}</h5>
         </div>
         <div className="flex-1 flex flex-col">
            <div className="mb-6">
               <span className="text-[#586380] font-semibold">
                  Select the correct definition
               </span>
            </div>
            <div className="flex-1">
               <ul
                  className="h-full grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4"
                  style={{
                     pointerEvents: isChoose ? 'none' : undefined,
                  }}
               >
                  {question.answers?.map((answer, index) => {
                     return (
                        <li key={answer.answerId}>
                           <Answer
                              answer={answer}
                              index={index + 1}
                              onChoose={handleChoose}
                              isCorrect={isCorrect(answer)}
                           />
                        </li>
                     );
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Question;
