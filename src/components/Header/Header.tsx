import { ROUTES } from '@constants';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import Button from '../Button';

const Header = () => {
   const router = useRouter();
   const user = useAuthUser();

   return (
      <header className="h-header flex items-center px-4 border-b border-solid border-[#edeff4] fixed top-0 left-0 right-0 bg-white z-[1000]">
         <div className="flex items-center justify-between w-full flex-1">
            <Link href={ROUTES.HOME}>
               <a>
                  <h3 className="text-3xl font-bold text-mainColor dark:text-white">
                     Quizz
                  </h3>
               </a>
            </Link>
            <div className="flex items-center space-x-4">
               {user?.id ? (
                  <>
                     <Button type="primary" className="!space-x-1">
                        <span>Create</span>
                        <BiPlus className="w-4 h-4" />
                     </Button>
                     <div className="cursor-pointer">
                        <Image
                           src={
                              (user.photoURL as string) || '/images/avatar.png'
                           }
                           alt={(user.displayName as string) || 'user'}
                           width={32}
                           height={32}
                           className="rounded-full"
                           style={{
                              boxShadow: 'inset 0 0 0.0625rem rgb(0 0 0 / 30%)',
                           }}
                        />
                     </div>
                  </>
               ) : (
                  <>
                     <Button
                        onClick={() => {
                           router.push(ROUTES.LOGIN);
                        }}
                        className="hover:bg-[#f6f7fb] !text-[#586380] active:bg-[#edeff4]"
                     >
                        Log in
                     </Button>
                     <Button
                        onClick={() => {
                           router.push(ROUTES.SIGN_UP);
                        }}
                        type="warn"
                     >
                        Sign up
                     </Button>
                  </>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
