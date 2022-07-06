import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { Login } from 'src/screens';

export const getServerSideProps = withAuthUserSSR({
   whenAuthed: AuthAction.REDIRECT_TO_APP,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser({
   whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
