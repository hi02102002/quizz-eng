import { FullPageLoading } from '@components';
import { Game } from '@screens';
import { termServices } from '@services';
import { IGame } from '@shared/types';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

interface Props {
   games: Array<IGame>;
   termId: string;
}

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   const games = await termServices.getGames(params?.id as string);

   return {
      props: {
         games,
         termId: params?.id as string,
      },
   };
});

export default withAuthUser<Props>({
   whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
   whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
   whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
   LoaderComponent: FullPageLoading,
})(Game);
