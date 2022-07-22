import { IAnswer, ITermWithUser, IQuestion } from '@shared/types';
import { getOneTerm } from './getOneTerm';
export const getQuestions = async (termId: string) => {
   const term = await getOneTerm(termId);

   const questions: Array<IQuestion> = [];

   for (let i = 0; i < term.flashcards.length; i++) {
      const answers: IQuestion['answers'] = [
         ...getAnswers(term, term.flashcards[i].id, {
            definition: term.flashcards[i].definition,
            answerId: term.flashcards[i].id,
            imgUrl: term.flashcards[i].imgUrl,
         }),
      ];

      questions.push({
         answers: answers,
         questionId: term.flashcards[i].id,
         term: term.flashcards[i].lexicon,
      });
   }

   return questions;
};

const checkExist = function (id: string, answerChoices: IQuestion['answers']) {
   return answerChoices.some((el) => el.answerId === id);
};

const random = (min: number, max: number) =>
   Math.floor(Math.random() * (max - min)) + min;

const getAnswers = (
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

   let currentIndex = answers.length,
      randomIndex;

   while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [answers[currentIndex], answers[randomIndex]] = [
         answers[randomIndex],
         answers[currentIndex],
      ];
   }

   return answers;
};
