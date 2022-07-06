import { withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { Landing } from 'src/screens';

export const getServerSideProps = withAuthUserSSR()(async () => {
   return {
      props: {},
   };
});

export default withAuthUser()(Landing);
