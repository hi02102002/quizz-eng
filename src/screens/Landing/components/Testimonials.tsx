import { Autoplay } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuid } from 'uuid';
const data: Array<{
   id: string;
   text: string;
   user: {
      name: string;
      age: number;
   };
}> = [
   {
      id: uuid(),
      text: 'When it came to studying I was a mess. Now I am at this new school and they introduced me to Quizz. I am no longer stressed when it comes to studying for assignments. Thank you Quizz!',
      user: {
         name: 'Agentdolly',
         age: 29,
      },
   },
   {
      id: uuid(),
      text: 'Quizz has helped me to understand just how fun and important and fun studying can be! This school year, in chemistry class I put my terms on Quizz and I already feel better about my upcoming test.',
      user: {
         name: 'Sierrafr',
         age: 19,
      },
   },
   {
      id: uuid(),
      text: 'Quizz is a great way to study. I introduced it to my friends and we are all improving. Whenever I think of Quizz, I think of the pure joy of studying in a few minutes instead of hours.',
      user: {
         name: 'Hoang huy',
         age: 20,
      },
   },
   {
      id: uuid(),
      text: 'Quizz helped my grades sooooo much. Thank you for making studying fun and productive!',
      user: {
         name: 'Nicoleb18',
         age: 17,
      },
   },
];

const Testimonials = () => {
   return (
      <div className="py-[6.25rem]">
         <div className="max-w-[70em] mx-auto px-10">
            <Swiper
               slidesPerView={1}
               autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
               }}
               loop={true}
               simulateTouch={false}
               modules={[Autoplay]}
            >
               {data.map((item) => {
                  return (
                     <SwiperSlide key={item.id} className="text-center">
                        <div>
                           <p className="text-[1.825rem] font-bold before:content-[url('/images/quotes-open.svg')] after:content-[url('/images/quotes-close.svg')]">
                              {item.text}
                           </p>
                           <span className="text-[#a9a9a9] font-semibold mt-6 block">
                              - {item.user.name}, AGE {item.user.age}
                           </span>
                        </div>
                     </SwiperSlide>
                  );
               })}
            </Swiper>
         </div>
      </div>
   );
};

export default Testimonials;
