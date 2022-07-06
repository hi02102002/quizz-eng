import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { Home } from 'src/screens';

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser()(Home);
