import { SignUp } from '@screens';
import { AuthAction, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';

export const getServerSideProps = withAuthUserSSR({
   whenAuthed: AuthAction.REDIRECT_TO_APP,
})(async () => {
   return {
      props: {},
   };
});

export default withAuthUser({
   whenAuthed: AuthAction.REDIRECT_TO_APP,
})(SignUp);
