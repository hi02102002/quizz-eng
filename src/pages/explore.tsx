import { FullPageLoading } from '@components';
import { Explore } from '@screens';
import { termServices } from '@services';
import { ITermWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   terms: Array<ITermWithUser>;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
   const terms = await termServices.getExplore(AuthUser.id as string);

   return {
      props: {
         terms,
      } as Props,
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Explore);
