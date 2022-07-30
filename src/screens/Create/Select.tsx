import { Button } from '@components';
import { useClickOutside } from '@hooks';
import { useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
   values: Array<{
      id: string;
      value: string;
   }>;
   onClick: (value: string) => void;
   value: string;
}

const Select = ({ onClick, values, value }: Props) => {
   const [isShow, setIsShow] = useState<boolean>(false);
   const selectRef = useRef<HTMLDivElement | null>(null);

   useClickOutside(selectRef, (e) => {
      e.stopPropagation();
      setIsShow(false);
   });

   const handelClick = (value: string) => () => {
      onClick(value);
      setIsShow(false);
   };

   return (
      <div ref={selectRef} className="min-w-[160px]">
         <div className="relative w-full">
            <Button
               typeBtn="primary"
               className="flex items-center justify-center !space-x-1 w-full"
               onClick={() => {
                  setIsShow(!isShow);
               }}
            >
               <div>{value || 'Choose an option'}</div>
               <MdKeyboardArrowDown
                  className="w-6 h-6 transition-transform"
                  style={{
                     transform: isShow ? 'rotate(-180deg)' : undefined,
                  }}
               />
            </Button>
            {isShow && (
               <div className="absolute w-full bg-white rounded mt-2 shadow-sm  ">
                  <ul className="py-2">
                     {values.map((_value) => {
                        return (
                           <li
                              onClick={handelClick(_value.value)}
                              key={_value.id}
                              className="p-4 py-2 cursor-pointer hover:bg-slate-200 transition-all"
                           >
                              {_value.value}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};

export default Select;
