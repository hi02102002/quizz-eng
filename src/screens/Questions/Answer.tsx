import { IAnswer } from '@shared/types';
import Image from 'next/image';
import { FiCheck } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

interface Props {
   answer: IAnswer;
   index: number;
   onChoose: (answerId: string) => void;
   isCorrect:
      | {
           correct: boolean;
           color: string;
        }
      | undefined;
}

const Answer = ({ answer, index, onChoose, isCorrect }: Props) => {
   return (
      <div
         className="h-full rounded bg-white border-2 border-[#edeff4] p-4   flex items-center justify-center cursor-pointer transition-all "
         onClick={() => {
            onChoose(answer.answerId);
         }}
         style={{
            borderColor: isCorrect?.color,
         }}
      >
         <div className="mr-4">
            {isCorrect ? (
               isCorrect.correct ? (
                  <FiCheck
                     className="h-6 w-6 "
                     style={{
                        color: isCorrect.color,
                     }}
                  />
               ) : (
                  <MdClose
                     className="h-6 w-6 "
                     style={{
                        color: isCorrect.color,
                     }}
                  />
               )
            ) : (
               <div className="h-6 w-6 rounded-full bg-[#edeff4] text-[#646f90] text-sm font-semibold flex items-center justify-center ">
                  {index}
               </div>
            )}
         </div>
         <span className="flex-1">{answer.definition}</span>
         {answer.imgUrl && (
            <Image
               src={answer.imgUrl}
               alt={answer.definition}
               width={60}
               height={60}
               objectFit="cover"
               className="rounded"
            />
         )}
      </div>
   );
};

export default Answer;
