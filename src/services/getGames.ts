import { IGame } from '@shared/types';
import { random } from '@utils';
import { v4 } from 'uuid';
import { getOneTerm } from './getOneTerm';

const checkExist = function (id: string, gameChoices: Array<IGame>) {
   return gameChoices.some((el) => el.flashcardId === id);
};

export const getGames = async (termId: string) => {
   const term = await getOneTerm(termId);
   const games: Array<IGame> = [];

   const length = term.flashcards.length >= 6 ? 12 : term.flashcards.length * 2;

   while (games.length !== length) {
      const randomFlashcard =
         term.flashcards[random(0, term.flashcards.length)];
      if (!checkExist(randomFlashcard.id, games)) {
         games.push({
            id: v4(),
            flashcardId: randomFlashcard.id,
            name: randomFlashcard.definition,
            imgUrl: randomFlashcard.imgUrl,
            stat: '',
         });
         games.push({
            id: v4(),
            flashcardId: randomFlashcard.id,
            name: randomFlashcard.lexicon,
            stat: '',
         });
      }
   }

   let currentIndex = games.length,
      randomIndex;

   while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [games[currentIndex], games[randomIndex]] = [
         games[randomIndex],
         games[currentIndex],
      ];
   }

   return games;
};
