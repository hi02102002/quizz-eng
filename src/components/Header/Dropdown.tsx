import { ROUTES } from '@constants';
import { useAuthUser } from 'next-firebase-auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';

const Dropdown = () => {
   const user = useAuthUser();
   const router = useRouter();

   return (
      <div className="absolute top-[calc(100%_+_((63px_-_32px)_/_2))] right-0">
         <div className="rounded bg-white  shadow-md min-w-[260px] overflow-hidden">
            <div
               className="flex items-center gap-4 p-4 border-b border-solid  hover:bg-slate-200 transition-all cursor-pointer"
               onClick={() => {
                  router.push(`${ROUTES.PROFILE}/${user.id}`);
               }}
            >
               <div className="flex-shrink-0">
                  <Image
                     src={user.photoURL as string}
                     alt={user.displayName as string}
                     width={32}
                     height={32}
                     className="object-cover rounded-full"
                  />
               </div>
               <div>
                  <h3 className="font-semibold">{user.displayName}</h3>
                  <span className="text-xs">{user.email}</span>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-200 transition-all font-medium">
               <AiOutlineSetting className="w-6 h-6" />
               <span>Setting</span>
            </div>
            <div
               className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-200 transition-all font-medium"
               onClick={() => {
                  user.signOut();
               }}
            >
               <AiOutlineLogout className="w-6 h-6" />
               <span>Log out</span>
            </div>
         </div>
      </div>
   );
};

export default Dropdown;
