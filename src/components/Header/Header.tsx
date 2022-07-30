import { ROUTES, SIDE_BAR_LIST } from '@constants';
import { useClickOutside } from '@hooks';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import Button from '../Button';
import Dropdown from './Dropdown';

const Header = () => {
   const router = useRouter();
   const user = useAuthUser();
   const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);
   useClickOutside(dropdownRef, (e) => {
      e.stopPropagation();
      setIsShowDropdown(false);
   });

   return (
      <header className="h-header flex items-center px-4 border-b border-solid border-[#edeff4] fixed top-0 left-0 right-0 bg-white z-[998]">
         <div className="flex items-center justify-between w-full flex-1 gap-4">
            <div className="flex items-center gap-4">
               <Link href={ROUTES.HOME}>
                  <a className="!no-underline">
                     <h3 className="text-3xl font-bold text-mainColor dark:text-white ">
                        <span className="md:block hidden">Quizz</span>
                        <span className="md:hidden block">Q</span>
                     </h3>
                  </a>
               </Link>
               <ul className="flex items-center gap-4">
                  {SIDE_BAR_LIST.map((item) => {
                     return (
                        <li key={item.id}>
                           <Link href={item.link}>
                              <a
                                 className={`!no-underline font-semibold relative ${
                                    router.pathname === item.link
                                       ? 'after:absolute after:content-[""] after:w-2 after:h-2 after:rounded-full after:bg-mainColor after:-bottom-2 after:left-[50%] after:translate-x-[-50%]'
                                       : ''
                                 }`}
                              >
                                 {item.name}
                              </a>
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </div>
            <div className="flex items-center space-x-4">
               {user?.id ? (
                  <>
                     <Button
                        typeBtn="primary"
                        className="!space-x-1"
                        onClick={() => {
                           router.push(ROUTES.CREATE);
                        }}
                     >
                        <span>Create</span>
                        <BiPlus className="w-4 h-4" />
                     </Button>
                     <div className="relative" ref={dropdownRef}>
                        <div
                           className="cursor-pointer"
                           onClick={() => {
                              setIsShowDropdown(!isShowDropdown);
                           }}
                        >
                           <Image
                              src={user.photoURL as string}
                              alt={(user.displayName as string) || 'user'}
                              width={32}
                              height={32}
                              className="rounded-full"
                              style={{
                                 boxShadow:
                                    'inset 0 0 0.0625rem rgb(0 0 0 / 30%)',
                              }}
                           />
                        </div>
                        {isShowDropdown && <Dropdown />}
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
                        typeBtn="warn"
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
