export interface IStudyModule {
   id: string;
   docId?: string;
   userId: string;
   title: string;
   description: string;
   numOfLexicon: number;
   urlImg?: string;
   isSaved: boolean;
   flashcards: Array<IStudy>;
   currentIndexFlashcard: number;
}

export interface IStudyModuleWithUser extends IStudyModule {
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

export interface IStudy {
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
