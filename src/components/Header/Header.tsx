import { ROUTES } from '@constants';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button';

const Header = () => {
   const user = useAuthUser();
   const router = useRouter();

   return (
      <header className="h-header flex items-center px-4 border-b border-solid border-[#edeff4]">
         <div className="flex items-center justify-between w-full flex-1">
            <Link href={ROUTES.HOME}>
               <a>
                  <h3 className="text-3xl font-bold text-mainColor dark:text-white">
                     Quizz
                  </h3>
               </a>
            </Link>
            <div className="flex items-center space-x-4">
               {user.id ? (
                  <>Have User</>
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

export default withAuthUser()(Header);
