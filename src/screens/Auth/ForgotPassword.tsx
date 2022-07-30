import { Button } from '@components';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '@lib/firebase';
import classNames from 'classnames/bind';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUnlock } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import authStyles from './Auth.module.scss';

const cx = classNames.bind(authStyles);

interface IFormInputs {
   email: string;
}

const schema = yup.object().shape({
   email: yup
      .string()
      .email('Invalid email.')
      .required('You must enter your email.'),
});

const ForgotPassword = () => {
   const router = useRouter();
   const [loading, setLoading] = useState<boolean>(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
   });

   const onSubmit = useCallback(
      async ({ email }: IFormInputs) => {
         try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);

            toast('Send link reset password successfully.', {
               type: 'success',
            });
            setLoading(false);
            reset();
         } catch (error: any) {
            setLoading(false);
            toast(error.message, {
               type: 'error',
            });
         } finally {
            setLoading(false);
         }
      },
      [reset]
   );

   return (
      <div className={`${cx('auth')} pb-6`}>
         <header
            className={`${cx(
               'header'
            )} h-header border-b border-solid border-[#edeff4] bg-white`}
         >
            <div className="w-full">
               <Link href={ROUTES.HOME}>
                  <a>
                     <h3 className={`${cx('auth-logo')} `}>Quizz</h3>
                  </a>
               </Link>
            </div>
         </header>
         <div className={`${cx('auth-main')} `}>
            <div className={cx('auth-main-wrap')}>
               <div className={cx('auth-content')}>
                  <div className="flex flex-col gap-4">
                     <div className="flex flex-col items-center">
                        <AiOutlineUnlock className="w-24 h-24 mb-4" />
                        <h4 className="font-semibold text-center mb-2">
                           Trouble Logging In?
                        </h4>
                        <p className="text-xs text-neutral-500 font-medium text-center">
                           Enter your email and we&lsquo;ll send you a link to
                           get back into your account.
                        </p>
                     </div>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                           className={cx('input-group', {
                              error: errors.email?.message,
                           })}
                        >
                           <input
                              type="email"
                              placeholder="Your Email"
                              {...register('email')}
                           />
                           {errors.email?.message && (
                              <p className={cx('error-msg')}>
                                 {errors.email?.message}
                              </p>
                           )}
                        </div>
                        <Button
                           typeBtn="primary"
                           className="!w-full mt-4 !py-3"
                           type="submit"
                           loading={loading ? 'ONLY_LOADING' : ''}
                        >
                           Send Login Link
                        </Button>
                     </form>
                     <Button
                        className="!w-full !py-3"
                        onClick={() => {
                           router.push(ROUTES.LOGIN);
                        }}
                     >
                        Back to login
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassword;
