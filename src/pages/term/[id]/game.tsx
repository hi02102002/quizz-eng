import { AuthAction, withAuthUserSSR } from 'next-firebase-auth';

const Games = () => {
   return <div>games</div>;
};

export const getServerSideProps = withAuthUserSSR({
   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
   console.log(params);

   return {
      props: {},
   };
});

export default Games;
