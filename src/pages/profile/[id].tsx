import { FullPageLoading } from '@components';
import { Profile } from '@screens';
import { termServices, userServices } from '@services';
import { ITermWithUser, IUser } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   user: IUser;
   terms: Array<ITermWithUser>;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params, AuthUser }) => {
   const id = params?.id as string;

   const user = await userServices.getUserById(id);

   let terms = await termServices.getOnlyTermOwnCreate(id);

   if (id === AuthUser.id) {
      terms = await termServices.getTermsByUserId(AuthUser.id);
   }

   return {
      props: {
         terms,
         user,
      } as Props,
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Profile);
