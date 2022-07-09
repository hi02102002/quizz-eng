import { db } from '@lib/firebase';
import { Auth, AuthError, AuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useLoginWithProvider = (auth: Auth, provider: AuthProvider) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<AuthError>();

   const loginWithProvider = useCallback(async () => {
      try {
         setLoading(true);
         const { user } = await signInWithPopup(auth, provider);

         const userRef = doc(db, 'users', user.uid);
         const docSnap = await getDoc(userRef);

         if (!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
               username: user.displayName,
               avatar:
                  user.photoURL ||
                  'https://firebasestorage.googleapis.com/v0/b/quizz-eng.appspot.com/o/avatar.png?alt=media&token=5cd3a44f-31f2-49a8-bd57-824f2664c97c',
               email: user.email,
               id: user.uid,
            });
         }
         toast(`Login successfully.`, {
            type: 'success',
         });
         setLoading(false);
      } catch (error: any) {
         console.log(error);
         setError(error as AuthError);
         setLoading(false);
         toast(error.message, {
            type: 'error',
         });
      } finally {
         setLoading(false);
      }
   }, [auth, provider]);

   return { loginWithProvider, loading, error };
};
