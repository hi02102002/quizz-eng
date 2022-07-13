import { Button } from '@components';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '@lib/firebase';
import classNames from 'classnames/bind';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import styles from './Auth.module.scss';
import AuthContainer from './AuthContainer';
const cx = classNames.bind(styles);

interface IFormInputs {
   email: string;
   password: string;
}

const schema = yup.object().shape({
   email: yup
      .string()
      .email('Invalid email.')
      .required('You must enter your email.'),
   password: yup.string().required('You must enter your password.'),
});

const Login = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async ({ email, password }: IFormInputs) => {
      try {
         setLoading(true);
         await signInWithEmailAndPassword(auth, email, password);
         toast('Login successfully.', {
            type: 'success',
         });
         setLoading(false);
      } catch (error: any) {
         setLoading(false);
         toast(error.message, {
            type: 'error',
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <AuthContainer
         title="Log In"
         contentNavigate={
            <div>
               <p className="text-center font-medium ">
                  {"Don't have an account? "}
                  <Link href={ROUTES.SIGN_UP}>
                     <a className="text-mainColor">Sign up</a>
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
                     placeholder="Your Email"
                     {...register('email')}
                  />
                  {errors.email?.message && (
                     <p className={cx('error-msg')}>{errors.email?.message}</p>
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
                     placeholder="Your password"
                     {...register('password')}
                  />
                  {errors.password?.message && (
                     <p className={cx('error-msg')}>
                        {errors.password?.message}
                     </p>
                  )}
               </div>
               <Button
                  className={cx('auth-btn-action')}
                  typeBtn="primary"
                  loading={loading ? 'ONLY_LOADING' : ''}
                  type="submit"
               >
                  Log in
               </Button>
            </form>
            <Link href={ROUTES.FORGOT_PASSWORD}>
               <a className="mt-4 font-medium line">
                  <p>Forgot your password?</p>
               </a>
            </Link>
         </div>
      </AuthContainer>
   );
};

export default Login;
