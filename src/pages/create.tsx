import { FullPageLoading } from '@components';
import { Create } from '@screens';
import { IFlashcard } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   title?: string;
   description?: string;
   status?: string;
   studySets?: Array<IFlashcard>;
   type: 'edit' | 'create';
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
   return {
      props: {
         type: 'create',
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Create);
