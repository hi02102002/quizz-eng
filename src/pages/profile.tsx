import { FullPageLoading } from '@components';
import { Profile } from '@screens';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Profile);
