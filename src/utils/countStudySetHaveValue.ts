import { IFlashcard } from '@shared/types';

export const countStudySetHaveValue = (studySets: IFlashcard[]) => {
   let count = 0;
   for (const studySet of studySets) {
      if (studySet.definition && studySet.lexicon) {
         count++;
      }
   }
   return count;
};
