import { getAllTerm } from '@services';
import { IStudyModule } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { Home } from 'src/screens';

interface Props {
   terms: Array<IStudyModule>;
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

export default withAuthUser<Props>()(Home);
