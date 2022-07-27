export interface ITerm {
   id: string;
   docId?: string;
   authorId: string;
   title: string;
   description: string;
   numOfLexicon: number;
   urlImg?: string;
   isSaved: boolean;
   flashcards: Array<IFlashcard>;
   currentIndexFlashcard: number;
   users: Array<string>; // chua mang id cua user ma luu cai do
   status: 'PUBLIC' | 'PRIVATE';
   createdAt: string;
}

export interface ITermWithUser extends ITerm {
   user: {
      username: string;
      email: string;
      avatar: string;
   };
}

export interface IQuestion {
   questionId: string;
   term: string;
   answers: Array<IAnswer>;
}

export interface IAnswer {
   definition: string;
   answerId: string;
   imgUrl?: string;
}

export interface IFlashcard {
   id: string;
   lexicon: string;
   definition: string;
   imgUrl?: string;
   index?: number;
}

export interface IValueImage {
   webSearchUrl: string;
   name: string;
   thumbnailUrl: string;
   datePublished: string;
   isFamilyFriendly: boolean;
   contentUrl: string;
   hostPageUrl: string;
   contentSize: string;
   encodingFormat: string;
   hostPageDisplayUrl: string;
   width: string;
   height: string;
   hostPageDiscoveredDate: string;
   thumbnail: {
      width: string;
      height: string;
   };
   imageInsightsToken: string;
   insightsMetadata: {
      recipeSourcesCount: number;
      pagesIncludingCount: number;
      availableSizesCount: number;
   };
   imageId: string;
   accentColor: string;
}

export interface IResultSearch {
   _type: string;
   instrumentation: {
      _type: string;
   };
   readLink: string;
   webSearchUrl: string;
   value: Array<IValueImage>;
}

export interface IUser {
   username: string;
   avatar?: string;
   email: string;
   id: string;
}

export interface ICurrentIndex {
   flashcardIndex: number;
   termId: string;
}

export const ItemTypes = {
   MATCH_QUESTION: 'MATCH_QUESTION',
};

export interface IGame {
   id: string;
   name: string;
   flashcardId: string;
   imgUrl?: string;
   stat: '' | 'CORRECT' | 'WRONG' | 'DELETED';
}
