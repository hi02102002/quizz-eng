import { Button } from '@components';
import { ROUTES } from '@constants';
import { useLoginWithProvider } from '@hooks';
import {
   auth,
   facebookProvider,
   githubProvider,
   googleProvider,
} from '@lib/firebase';
import classNames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import authStyles from './Auth.module.scss';

const cx = classNames.bind(authStyles);

interface Props {
   children: React.ReactNode;
   title: string;
   contentNavigate: React.ReactNode;
}

const AuthContainer = ({ children, title, contentNavigate }: Props) => {
   const { loginWithProvider: loginWithGoggle, loading: googleLoading } =
      useLoginWithProvider(auth, googleProvider);
   const { loginWithProvider: loginWithFacebook, loading: facebookLoading } =
      useLoginWithProvider(auth, facebookProvider);
   const { loginWithProvider: loginWithGithub, loading: githubLoading } =
      useLoginWithProvider(auth, githubProvider);

   return (
      <div className={`${cx('auth')} pb-6`}>
         <header className={`${cx('header')} h-header `}>
            <div className="w-full">
               <Link href={ROUTES.HOME}>
                  <a>
                     <h3 className={cx('auth-logo')}>Quizz</h3>
                  </a>
               </Link>
            </div>
         </header>
         <div className={`${cx('auth-main')} `}>
            <div className={cx('auth-main-wrap')}>
               <h2 className={cx('auth-title')}>{title}</h2>
               <div className={cx('auth-content')}>
                  <div className={cx('btn-providers-group')}>
                     <Button
                        className={cx('btn-provider')}
                        onClick={() => {
                           loginWithGoggle();
                        }}
                        loading={googleLoading ? 'ONLY_LOADING' : ''}
                     >
                        <FcGoogle />
                        <span>Login with Google</span>
                     </Button>
                     <Button
                        className={cx('btn-provider')}
                        onClick={() => {
                           loginWithFacebook();
                        }}
                        loading={facebookLoading ? 'ONLY_LOADING' : ''}
                     >
                        <BsFacebook className="text-[#046ce4]" />
                        <span>Login with Facebook</span>
                     </Button>
                     <Button
                        className={cx('btn-provider')}
                        onClick={() => {
                           loginWithGithub();
                        }}
                        loading={githubLoading ? 'ONLY_LOADING' : ''}
                     >
                        <AiFillGithub className="text-[#42526e]" />
                        <span>Login with Github</span>
                     </Button>
                  </div>
                  <div className="mt-9">{children}</div>
               </div>
               <div className={`${cx('auth-content')} mt-5 `}>
                  {contentNavigate}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthContainer;
