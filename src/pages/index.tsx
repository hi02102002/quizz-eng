import { FullPageLoading } from '@components';
import { getAllTerm } from '@services';
import { ITermWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { Home } from 'src/screens';

interface Props {
   terms: Array<ITermWithUser>;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
   const terms = await getAllTerm(AuthUser.id as string);

   return {
      props: {
         terms,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Home);
