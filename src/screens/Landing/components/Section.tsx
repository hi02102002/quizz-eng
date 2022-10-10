import { StaticImageData } from 'next/image';

/* eslint-disable @next/next/no-img-element */
interface Props {
   position?: 'reverser' | 'normal';
   text: string;
   image: string | StaticImageData;
   title: string;
   className?: string;
}

const Section = ({
   position = 'normal',
   text,
   image,
   title,
   className = '',
}: Props) => {
   return (
      <section className={`mb-10 md:mb-[80px] ${className}`}>
         <div
            className={`flex items-center max-w-[70em] mx-auto px-10 gap-8 lg:gap-[5.375rem] flex-col  ${
               position === 'normal' ? 'md:flex-row ' : 'md:flex-row-reverse'
            }`}
         >
            <div className="max-w-[390px] text-center">
               <h2 className="text-[2rem] font-bold">{title}</h2>
               <p className="py-6 text-xl">{text}</p>
            </div>
            <div className=" relative w-full">
               <img
                  src={image as string}
                  alt=""
                  className="w-full h-full object-contain"
               />
            </div>
         </div>
      </section>
   );
};

export default Section;
