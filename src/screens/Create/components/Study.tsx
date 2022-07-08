/* eslint-disable @next/next/no-img-element */
import { Button, Spiner } from '@components';
import { useDebounce } from '@hooks';
import { storage } from '@lib/firebase';
import { IStudy, IValueImage } from '@shared/types';
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import {
   ChangeEvent,
   FormEvent,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { Swiper, SwiperSlide } from 'swiper/react';
import Input from './Input';
interface Props {
   index: number;
   value: IStudy;
   onChange: (input: IStudy) => void;
   onRemove: () => void;
}

let persistText: string;

const Study = ({ index, value, onChange, onRemove }: Props) => {
   const [showSearchImage, setShowSearchImage] = useState<boolean>(false);
   const [searchText, setSearchText] = useState<string>(value.lexicon);
   const debounceSearchValue = useDebounce(searchText, 800);
   const [searchImages, setSearchImages] = useState<Array<IValueImage>>([]);
   const [searchLoading, setSearchLoading] = useState<boolean>(false);
   const [isSearched, setIsSearched] = useState<boolean>(false);
   const [chooseImage, setChooseImage] = useState<{
      type: 'file' | 'url';
      url: string;
   }>({
      type: 'url',
      url: '',
   });
   const inputFileImageRef = useRef<HTMLInputElement | null>(null);
   const [loadingUploadFile, setLoadingUpLoadFile] = useState<boolean>(false);

   const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
      onChange({
         ...value,
         [e.currentTarget.name]: e.currentTarget.value,
      });
   };

   const handleUploadOwnImage = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const id = value.id;
      if (file) {
         setLoadingUpLoadFile(true);
         const imgRef = ref(storage, id);
         await uploadBytes(imgRef, file);
         const url = await getDownloadURL(imgRef);
         setChooseImage({
            type: 'file',
            url,
         });
         setLoadingUpLoadFile(false);
      }
      setShowSearchImage(false);
   };

   const handleRemoveUploadedOwnImage = async () => {
      if (chooseImage.type === 'file') {
         const desertRef = ref(storage, value.id);
         deleteObject(desertRef)
            .then(() => {
               console.log('xoa thanh cong');
               setChooseImage({
                  type: 'file',
                  url: '',
               });
            })
            .catch((error) => {
               console.log('xoa that bai');
            });
      } else {
         setChooseImage({
            type: 'url',
            url: '',
         });
      }
   };

   useEffect(() => {
      onChange({
         ...value,
         imgUrl: chooseImage.url,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [chooseImage.url]);

   const renderSearchResult = useCallback(() => {
      if (searchLoading) {
         return (
            <div className="h-full flex items-center justify-center">
               <Spiner />
            </div>
         );
      }

      if (!searchLoading && searchImages.length === 0 && isSearched) {
         return <p>No result of {persistText}</p>;
      }

      return (
         <Swiper slidesPerView={4} spaceBetween={16} className="select-none">
            {searchImages.map((img) => {
               return (
                  <SwiperSlide key={img.imageId} className="relative">
                     <div
                        className="flex items-center justify-center rounded cursor-pointer"
                        style={{
                           backgroundColor: `#${img.accentColor}`,
                        }}
                        onClick={() => {
                           setChooseImage({
                              type: 'url',
                              url: img.thumbnailUrl,
                           });
                           setShowSearchImage(false);
                        }}
                     >
                        <img
                           src={img.thumbnailUrl}
                           alt={img.name}
                           className="h-[150px] object-contain "
                        />
                     </div>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      );
   }, [isSearched, searchImages, searchLoading]);

   useEffect(() => {
      if (debounceSearchValue.length) {
         setSearchLoading(true);
         fetch(
            `https://bing-image-search1.p.rapidapi.com/images/search?q=${encodeURI(
               debounceSearchValue
            )}`,
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
            .then(({ value }) => {
               if (value) {
                  setSearchImages(value);
               }
               setSearchLoading(false);
               setIsSearched(true);
               return value;
            })
            .catch((error) => {
               console.log(error);
               setSearchLoading(false);
               setIsSearched(true);
               setSearchImages([]);
            });
         persistText = debounceSearchValue;
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
               <div className="flex items-start space-x-6">
                  <Input
                     label="Definition"
                     placeholder="Enter definition"
                     onChange={handleChange}
                     name="definition"
                     value={value.definition}
                  />
                  {chooseImage.url ? (
                     <div className=" w-[5.25rem] h-[3.75rem] cursor-zoom-in relative">
                        <img
                           src={chooseImage.url}
                           alt=""
                           className="w-full h-full object-cover rounded"
                        />
                        <button
                           className="absolute w-7 h-7 flex items-center justify-center bg-[#303545] rounded right-[2px] top-[2px]"
                           onClick={handleRemoveUploadedOwnImage}
                        >
                           <CgTrash className="w-4 h-4 text-white" />
                        </button>
                     </div>
                  ) : (
                     <button
                        className="flex flex-col items-center justify-center  p-[5px] border-2 border-dashed rounded w-[5.25rem] h-[3.75rem] hover:border-[#ffcd1f] group transition-all"
                        onClick={() => {
                           setShowSearchImage(!showSearchImage);
                        }}
                     >
                        <BiImageAdd className="h-5 w-5 group-hover:text-[#ffcd1f] transition-all" />
                        <span className="text-xs font-semibold">Image</span>
                     </button>
                  )}
               </div>
            </div>
         </div>
         {showSearchImage && (
            <div className="py-3 px-6 ">
               <div className="flex items-center space-x-8 mb-6">
                  <div className="max-w-[250px] w-full flex-shrink-0">
                     <Input
                        placeholder="Search Quizz Images..."
                        onChange={(e) => {
                           setSearchText(e.currentTarget.value);
                        }}
                        value={searchText}
                     />
                  </div>
                  <Button
                     type="success"
                     className="!py-3 !px-6"
                     onClick={() => {
                        inputFileImageRef.current?.click();
                     }}
                     loading={loadingUploadFile ? 'HAVE_TEXT' : ''}
                  >
                     Or upload your own image
                  </Button>
                  <input
                     type="file"
                     className="hidden"
                     ref={inputFileImageRef}
                     accept="image/*"
                     onChange={handleUploadOwnImage}
                  />
               </div>
               <div className="max-h-[150px] min-h-[150px] flex items-center justify-center">
                  {renderSearchResult()}
               </div>
            </div>
         )}
      </div>
   );
};

export default Study;
