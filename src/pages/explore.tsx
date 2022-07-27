import { FullPageLoading } from '@components';
import { Explore } from '@screens';
import { termServices } from '@services';
import { ITermWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   terms: Array<ITermWithUser>;
   lastVisible: any;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
   const { terms, lastVisible } = await termServices.getExplore(
      AuthUser.id as string
   );

   return {
      props: {
         terms,
         lastVisible: JSON.stringify(lastVisible),
      } as Props,
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Explore);
