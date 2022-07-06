/* eslint-disable @next/next/no-img-element */
interface Props {
   position?: 'reverser' | 'normal';
   text: string;
   image: string;
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
      <section className={`mb-[80px] ${className}`}>
         <div
            className={`flex items-center max-w-[70em] mx-auto px-10 gap-[5.375rem] ${
               position === 'normal' ? 'flex-row' : 'flex-row-reverse'
            }`}
         >
            <div className="max-w-[410px] text-center">
               <h2 className="text-[2rem] font-bold">{title}</h2>
               <p className="py-6 text-xl">{text}</p>
            </div>
            <div className=" relative">
               <img src={image} alt="" className="w-full" />
            </div>
         </div>
      </section>
   );
};

export default Section;
