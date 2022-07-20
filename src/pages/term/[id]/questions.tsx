import { Questions } from '@screens';
import { IQuestion } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { getQuestions } from 'src/services/getQuestions';

interface Props {
   questions: Array<IQuestion>;
   termId: string;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const questions = await getQuestions(params?.id as string);

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
