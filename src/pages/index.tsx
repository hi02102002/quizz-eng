import { getAllTerm } from '@services';
import { IStudyModuleWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import FullpageLoading from 'src/components/FullpageLoading/FullpageLoading';
import { Home } from 'src/screens';

interface Props {
   terms: Array<IStudyModuleWithUser>;
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
   LoaderComponent: FullpageLoading,
})(Home);
