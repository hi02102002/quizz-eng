interface Props {
   remaining: number;
   incorrect: number;
   correct: number;
   total: number;
}

const calcPercent = (value: number, total: number) => {
   return `${(value / total) * 100}%`;
};

const Sidebar = ({ correct, incorrect, remaining, total }: Props) => {
   return (
      <aside className="md:max-w-[200px] w-full">
         <div className="p-4 rounded bg-white">
            <div className="flex flex-col space-y-4">
               <div className="flex flex-col w-full space-y-2">
                  <div className="h-4 w-full bg-[#4257b24d]">
                     <div
                        className="transition-all h-full bg-[#4257b2]"
                        style={{
                           width: calcPercent(remaining, total),
                        }}
                     ></div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="uppercase text-xs font-semibold">
                        remaining
                     </span>
                     <span>{remaining}</span>
                  </div>
               </div>
               <div className="flex flex-col w-full space-y-2">
                  <div className="h-4 w-full bg-[#ff725b4d]">
                     <div
                        className="transition-all h-full bg-[#ff725b]"
                        style={{
                           width: calcPercent(incorrect, total),
                        }}
                     ></div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="uppercase text-xs font-semibold">
                        incorrect
                     </span>
                     <span>{incorrect}</span>
                  </div>
               </div>
               <div className="flex flex-col w-full space-y-2">
                  <div className="h-4 w-full bg-[#23b26d4d]">
                     <div
                        className="transition-all h-full bg-[#23b26d]"
                        style={{
                           width: calcPercent(correct, total),
                        }}
                     ></div>
                  </div>

                  <div className="flex items-center justify-between">
                     <span className="uppercase text-xs font-semibold">
                        correct
                     </span>
                     <span>{correct}</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
