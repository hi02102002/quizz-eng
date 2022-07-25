import { useEffect, useState } from 'react';

interface Props {
   isStop: boolean;
   getScore: (value: number) => void;
   bestTime: number;
   isTryAgain: boolean;
}

const Sidebar = ({ isStop, getScore, bestTime, isTryAgain }: Props) => {
   const [timer, setTimer] = useState<number>(0);

   useEffect(() => {
      let interval: NodeJS.Timer;
      if (!isStop) {
         interval = setInterval(() => {
            setTimer((time) => time + 10);
         }, 10);
      } else {
         //@ts-ignore
         clearInterval(interval);
      }

      return () => {
         interval && clearInterval(interval);
      };
   }, [isStop]);

   useEffect(() => {
      if (isStop) {
         getScore(timer);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timer, isStop]);

   useEffect(() => {
      if (isTryAgain) {
         setTimer(0);
      }
   }, [isTryAgain]);

   return (
      <aside className="md:max-w-[200px] w-full">
         <div className="p-4 rounded bg-white  flex  md:flex-col md:items-start items-center md:justify-start justify-center gap-4">
            <div className="flex flex-col space-y-2">
               <span className="uppercase text-xs font-semibold">Time</span>
               <span className="text-3xl font-bold text-[#4257b2]">
                  {('0' + Math.floor((timer / 60000) % 60)).slice(-2)}:
                  {('0' + Math.floor((timer / 1000) % 60)).slice(-2)}
               </span>
            </div>
            <div className="flex flex-col space-y-2">
               <span className="uppercase text-xs font-semibold">
                  Best time
               </span>
               <span className="text-3xl font-bold">
                  {('0' + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
                  {('0' + Math.floor((bestTime / 1000) % 60)).slice(-2)}
               </span>
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
