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

export interface IStudyModuleWithUser extends IStudyModule {
   username: string;
   email: string;
   avatar: string;
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
