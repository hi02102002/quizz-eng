import { Button } from '@components';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, db } from '@lib/firebase';
import { getUserByUsername } from '@services';
import classNames from 'classnames/bind';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import styles from './Auth.module.scss';
import AuthContainer from './AuthContainer';

const cx = classNames.bind(styles);

interface IFormInputs {
   email: string;
   username: string;
   password: string;
   confirmPassword: string;
}

const schema = yup.object().shape({
   email: yup
      .string()
      .email('Invalid email.')
      .required('You must enter your email.'),
   username: yup
      .string()
      .required('You must enter username.')
      .min(6, 'Username at least 6 letter.'),
   password: yup
      .string()
      .required('You must enter your password.')
      .min(8, 'Password at least 8 letter.'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match.')
      .required('Your must enter confirm password.'),
});

const SignUp = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
   });
   const [loading, setLoading] = useState<boolean>(false);

   const onSubmit = useCallback(
      async ({ email, password, username }: IFormInputs) => {
         try {
            setLoading(true);

            const userExist = await getUserByUsername(username);

            if (userExist) {
               toast('Username already use by other user.', {
                  type: 'error',
               });
               setLoading(false);
               return;
            }

            const { user } = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );

            await updateProfile(user, {
               displayName: username,
               photoURL:
                  'https://firebasestorage.googleapis.com/v0/b/quizz-eng.appspot.com/o/avatar.png?alt=media&token=5cd3a44f-31f2-49a8-bd57-824f2664c97c',
            });

            await setDoc(doc(db, 'users', user.uid), {
               username,
               avatar:
                  'https://firebasestorage.googleapis.com/v0/b/quizz-eng.appspot.com/o/avatar.png?alt=media&token=5cd3a44f-31f2-49a8-bd57-824f2664c97c',
               email: user.email,
               id: user.uid,
            });
            setLoading(false);
            toast('Sign up successfully.', {
               type: 'success',
            });
         } catch (error: any) {
            setLoading(false);
            toast(error.message, {
               type: 'error',
            });
         }
      },
      []
   );

   return (
      <AuthContainer
         title="Sign Up"
         contentNavigate={
            <div>
               <p className="text-center font-medium ">
                  {'Already signed up? '}
                  <Link href={ROUTES.LOGIN}>
                     <a className="text-mainColor">Go to login</a>
                  </Link>
               </p>
            </div>
         }
      >
         <div>
            <form className={cx('auth-form')} onSubmit={handleSubmit(onSubmit)}>
               <div
                  className={cx('input-group', {
                     error: errors.email?.message,
                  })}
               >
                  <label>Email</label>
                  <input
                     type="email"
                     placeholder="Email"
                     {...register('email')}
                  />
                  {errors.email?.message && (
                     <p className={cx('error-msg')}>{errors.email?.message}</p>
                  )}
               </div>
               <div
                  className={cx('input-group', {
                     error: errors.username?.message,
                  })}
               >
                  <label>Username</label>
                  <input placeholder="Username" {...register('username')} />
                  {errors.username?.message && (
                     <p className={cx('error-msg')}>
                        {errors.username?.message}
                     </p>
                  )}
               </div>
               <div
                  className={cx('input-group', {
                     error: errors.password?.message,
                  })}
               >
                  <label>Password</label>
                  <input
                     type="password"
                     placeholder="Password"
                     {...register('password')}
                  />
                  {errors.password?.message && (
                     <p className={cx('error-msg')}>
                        {errors.password?.message}
                     </p>
                  )}
               </div>
               <div
                  className={cx('input-group', {
                     error: errors.confirmPassword?.message,
                  })}
               >
                  <label>Confirm password</label>
                  <input
                     type="password"
                     placeholder="Confirm password"
                     {...register('confirmPassword')}
                  />
                  {errors.confirmPassword?.message && (
                     <p className={cx('error-msg')}>
                        {errors.confirmPassword?.message}
                     </p>
                  )}
               </div>
               <Button
                  className={cx('auth-btn-action')}
                  typeBtn="primary"
                  loading={loading ? 'ONLY_LOADING' : ''}
                  type="submit"
               >
                  Sign up
               </Button>
            </form>
         </div>
      </AuthContainer>
   );
};

export default SignUp;
