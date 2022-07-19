import { Flashcards } from '@screens';
import { getOneTerm } from '@services';
import { IStudyModuleWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   term: IStudyModuleWithUser;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const term = await getOneTerm(params?.id as string);

   return {
      props: {
         term,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Flashcards);
