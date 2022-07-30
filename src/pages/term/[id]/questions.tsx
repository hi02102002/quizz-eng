import { FullPageLoading } from '@components';
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
   const questions = await termServices.getQuestions(params?.id as string);

   return {
      props: {
         questions,
         termId: params?.id as string,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Questions);
