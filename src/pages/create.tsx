import { Create } from '@screens';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser()(Create);
