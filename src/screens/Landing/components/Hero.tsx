import { Button } from '@components';
import { ROUTES } from '@constants';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

/* eslint-disable @next/next/no-img-element */
const Hero = () => {
   const user = useAuthUser();
   const router = useRouter();
   const handleGetStarted = useCallback(() => {
      if (user.id) {
         router.push(ROUTES.HOME);
      } else {
         router.push(ROUTES.LOGIN);
      }
   }, [user, router]);

   return (
      <div
         className=" bg-center bg-cover bg-no-repeat flex items-center justify-center py-[4rem]"
         style={{
            backgroundImage: 'url("/images/hero.svg") ',
         }}
      >
         <div className="md:px-[2.5rem] px-4">
            <div className="relative">
               <div className="max-w-[81.25rem]">
                  <img
                     className="min-h-[31.25rem] object-cover block w-full rounded-[1.5rem]"
                     src="/images/img-hero.avif"
                     alt=""
                  />
               </div>
               <div className="absolute bottom-0 left-0 flex md:flex-row flex-col md:items-end items-center text-center md:text-start w-full justify-between p-4 md:p-0">
                  <div className="max-w-[30rem] md:m-[3rem] m-[1.5rem] text-white w-full">
                     <h1 className="text-5xl font-semibold mb-4">
                        Learn it. Own it. Quizz.
                     </h1>
                     <p className="font-medium">
                        With new expert explanations, an AI Learning Assistant
                        and our ever-effective flashcards, get a suite of
                        science-backed study tools at your fingertips.
                     </p>
                  </div>
                  <Button
                     typeBtn="primary"
                     className="!py-[1.25rem] !px-[2rem] md:m-[3rem] m-[1.5rem]"
                     onClick={handleGetStarted}
                  >
                     Get stared
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Hero;
