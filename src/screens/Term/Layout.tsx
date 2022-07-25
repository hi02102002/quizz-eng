import { Button } from '@components';
import { ROUTES } from '@constants';
import { useRouter } from 'next/router';
import React from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
   children: React.ReactNode;
   termId: string;
   name: string;
   icon: React.ReactNode;
   haveProgress?: boolean;
   widthProgress?: number;
}

const Layout = ({
   children,
   termId,
   haveProgress,
   widthProgress,
   icon,
   name,
}: Props) => {
   const router = useRouter();
   return (
      <div>
         <div className="h-header bg-white border-b border-[#edeff4] flex items-center relative overflow-hidden">
            <div className="flex items-center justify-between px-4 w-full relative">
               <div className="flex items-center space-x-4">
                  {icon}
                  <span className="text-[#586380] text-base font-semibold">
                     {name}
                  </span>
               </div>
               <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center flex-col text-center text-[#586380] text-base font-semibold ">
                  <span className="pagination-header"></span>
               </div>
               <Button
                  className="w-10 h-10 flex items-center justify-center border-[#d9dde8] !border border-solid !p-0 hover:bg-[#d9dde8] transition-all "
                  onClick={() => {
                     router.push(`${ROUTES.TERM}/${termId}`);
                  }}
               >
                  <MdClose className="w-5 h-5 text-[#586380 ]" />
               </Button>
            </div>
            {haveProgress && widthProgress && (
               <div
                  className="absolute w-full bottom-0 left-0 right-0 h-[2px] bg-mainColor transition-all"
                  style={{
                     width: `${widthProgress * 100}%`,
                  }}
               ></div>
            )}
         </div>
         <div className="ui-container h-full md:!p-10 !p-4   w-full">
            {children}
         </div>
      </div>
   );
};

export default Layout;
