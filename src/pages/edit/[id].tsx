import { Spiner } from '@components';
import { Create } from '@screens';
import { getOneTerm } from '@services';
import { IStudy } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   title?: string;
   description?: string;
   flashcards?: Array<IStudy>;
   type: 'edit' | 'create';
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const term = await getOneTerm(params?.id as string);
   return {
      props: {
         type: 'edit',
         title: term.title,
         description: term.description,
         flashcards: term.flashcards,
         id: params?.id,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: Spiner,
})(Create);
