import { Button } from '@components';
import { useDebounce } from '@hooks';
import { IStudy } from '@shared/types';
import { FormEvent, useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import Input from './Input';
interface Props {
   index: number;
   value: IStudy;
   onChange: (input: IStudy) => void;
   onRemove: () => void;
}

const Study = ({ index, value, onChange, onRemove }: Props) => {
   const [showSearchImage, setShowSearchImage] = useState<boolean>(false);
   const [searchText, setSearchText] = useState<string>(value.lexicon);
   const debounceSearchValue = useDebounce(searchText, 800);

   const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
      onChange({
         ...value,
         [e.currentTarget.name]: e.currentTarget.value,
      });
   };

   useEffect(() => {
      if (debounceSearchValue.length) {
         const data = fetch(
            `https://bing-image-search1.p.rapidapi.com/images/search?q=${debounceSearchValue}`,
            {
               headers: {
                  'X-RapidAPI-Key': process.env
                     .NEXT_PUBLIC_RAPID_API_KEY as string,
                  'X-RapidAPI-Host': process.env
                     .NEXT_PUBLIC_RAPID_HOST as string,
                  'Content-Type': 'application/json',
               },
               method: 'GET',
            }
         )
            .then((value) => value.json())
            .then((value) => {
               console.log(value);
            });
      }
   }, [debounceSearchValue]);

   return (
      <div className="rounded-lg bg-white shadow-card">
         <div className="flex items-center justify-between font-bold text-[#939bb4] p-3 border-b-2 border-solid border-neutral-200  ">
            <span className="w-10 flex items-center justify-center">
               {index}
            </span>
            <button
               className="w-9 h-9 flex items-center justify-center"
               onClick={onRemove}
            >
               <CgTrash className="w-[18px] h-[18px]" />
            </button>
         </div>
         <div className="p-3 pb-6 flex items-start">
            <div className="w-full p-3 pr-6">
               <Input
                  label="Term"
                  placeholder="Enter term"
                  onChange={handleChange}
                  value={value.lexicon}
                  name="lexicon"
               />
            </div>
            <div className="w-full p-3 pl-6">
               <div className="flex items-start">
                  <Input
                     label="Definition"
                     placeholder="Enter definition"
                     onChange={handleChange}
                     name="definition"
                     value={value.definition}
                  />
                  <button
                     className="flex flex-col items-center justify-center ml-6 p-[5px] border-2 border-dashed rounded w-[5.25rem] h-[3.75rem] hover:border-[#ffcd1f] group transition-all"
                     onClick={() => {
                        setShowSearchImage(!showSearchImage);
                     }}
                  >
                     <BiImageAdd className="h-5 w-5 group-hover:text-[#ffcd1f] transition-all" />
                     <span className="text-xs font-semibold">Image</span>
                  </button>
               </div>
            </div>
         </div>
         {showSearchImage && (
            <div className="py-3 px-6 ">
               <div className="flex items-center space-x-8">
                  <div className="max-w-[250px] w-full flex-shrink-0">
                     <Input
                        placeholder="Search Quizz Images..."
                        onChange={(e) => {
                           setSearchText(e.currentTarget.value);
                        }}
                        value={searchText}
                     />
                  </div>
                  <Button type="success" className="!py-3 !px-6">
                     Or upload your own image
                  </Button>
               </div>
               <div className="min-h-[150px]"></div>
            </div>
         )}
      </div>
   );
};

export default Study;
