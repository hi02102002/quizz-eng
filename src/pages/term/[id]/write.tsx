import { Write } from '@screens';
import { getOneTerm } from '@services';
import { ITermWithUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   term: ITermWithUser;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const term = await getOneTerm(params?.id as string);

   return {
      props: {
         term,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Write);
