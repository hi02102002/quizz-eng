import { Layout } from '@components';
import Hero from './components/Hero';
import Section from './components/Section';
import Testimonials from './components/Testimonials';

const Landing = () => {
   return (
      <Layout>
         <Hero />
         <div className="py-[10.125rem] text-center">
            <p className="px-[2.5rem] text-[2rem] font-semibold text-center">
               <span
                  className="p-[2.1875rem] bg-contain bg-center bg-no-repeat "
                  style={{
                     backgroundImage: 'url("/images/circle.svg")',
                     backgroundSize: '100%',
                  }}
               >
                  90%
               </span>
               of students who use Quizz report higher grades.
            </p>
         </div>
         <Section
            title="Explanations you can trust."
            text="Quizz explanations show you step-by-step approaches to solve tough problems. Find solutions in 64 subjects, all written and verified by experts."
            image="/images/home-img-1.png"
         />
         <Section
            title="Flashcards on repeat. Study modes on shuffle."
            text="Mixed with smart study tools, our flashcards have been helping students ace their toughest exams since 2005."
            image="/images/home-img-2.png"
            position="reverser"
         />
         <Section
            title="Whether you plan or cram, find your study jam."
            text="Early morning? All-nighter? With teaching methods backed by learning science, Quizz is designed to save you time."
            image="/images/home-img-3.png"
         />
         <Section
            title="Millions of study sets"
            text="Find, study or create sets anywhere life takes you with the mobile app."
            image="/images/home-img-4.png"
            position="reverser"
            className="!mb-0"
         />
         <Testimonials />
      </Layout>
   );
};

export default Landing;
