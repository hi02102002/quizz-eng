import { Header } from '@components';
import type { NextPage } from 'next';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

const Home: NextPage = () => {
   return (
      <div>
         <Header />
      </div>
   );
};

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser<NextPage>()(Home);
