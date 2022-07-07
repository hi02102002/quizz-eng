import { IStudy } from '@shared/types';

export const countStudySetHaveValue = (studySets: IStudy[]) => {
   let count = 0;
   for (const studySet of studySets) {
      if (studySet.definition && studySet.lexicon) {
         count++;
      }
   }
   return count;
};
