import { Landing } from '@screens';
import { withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

export const getServerSideProps = withAuthUserSSR()(async () => {
   return {
      props: {},
   };
});

export default withAuthUser()(Landing);
