export interface IStudyModule {
   id: string;
   docId?: string;
   userId: string;
   title: string;
   description: string;
   numOfLexicon: number;
   urlImg?: string;
   isSaved: boolean;
}

export interface IStudy {
   id: string;
   lexicon: string;
   definition: string;
   imgUrl?: string;
}

export interface IQuestion {
   id: string;
   question: string; // definition
   choices: Array<{
      id: string;
      isAnswer: boolean;
      textAnswer: string; // lexicon
   }>;
}
