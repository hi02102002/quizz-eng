import { Questions } from '@screens';
import { termServices } from '@services';
import { IQuestion } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   questions: Array<IQuestion>;
   termId: string;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const questions = await termServices.getGames(params?.id as string);

   console.log(questions);

   return {
      props: {
         questions,
         termId: params?.id as string,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Questions);
