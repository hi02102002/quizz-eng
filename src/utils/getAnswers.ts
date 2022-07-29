import { IAnswer, IQuestion, ITermWithUser } from '@shared/types';
import { random } from './random';

const checkExist = function (id: string, answerChoices: IQuestion['answers']) {
   return answerChoices.some((el) => el.answerId === id);
};

export const getAnswers = (
   term: ITermWithUser,
   flashcardId: string,
   currentAnswer: IAnswer
) => {
   const answers: IQuestion['answers'] = [];
   const flashcardLength = term.flashcards.length;
   const length = flashcardLength >= 4 ? 3 : 1;
   while (answers.length !== length) {
      const randomAnswer = term.flashcards[random(0, flashcardLength)];
      if (
         !checkExist(randomAnswer.id, answers) &&
         randomAnswer.id !== flashcardId
      ) {
         answers.push({
            definition: randomAnswer.definition,
            answerId: randomAnswer.id,
            imgUrl: randomAnswer.imgUrl,
         });
      }
   }
   answers.push(currentAnswer);

   return answers.sort(() => Math.random() - 0.5);
};
