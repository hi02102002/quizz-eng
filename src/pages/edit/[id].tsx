import { FullPageLoading } from '@components';
import { Create } from '@screens';
import { termServices } from '@services';
import { IFlashcard } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   title?: string;
   description?: string;
   flashcards?: Array<IFlashcard>;
   type: 'edit' | 'create';
   status?: string;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const term = await termServices.getTermById(params?.id as string);
   return {
      props: {
         type: 'edit',
         title: term.title,
         description: term.description,
         flashcards: term.flashcards,
         id: params?.id,
         status: term.status,
      } as Props,
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Create);
