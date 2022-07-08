import { Layout } from '@components';
import { IStudyModuleWithUser } from '@shared/types';
import { useEffect } from 'react';
import Term from './Term';

interface Props {
   terms: Array<IStudyModuleWithUser>;
}

export const Home = ({ terms }: Props) => {
   useEffect(() => {
      const body = document.querySelector('body');
      if (body) {
         body.style.backgroundColor = '#f6f7fb';
      }
   }, []);

   return (
      <Layout>
         <div className="py-10">
            <div className="ui-container">
               <ul className="grid grid-cols-3 gap-3">
                  {terms.map((term) => {
                     return (
                        <li key={term.id}>
                           <Term term={term} />
                        </li>
                     );
                  })}
               </ul>
            </div>
         </div>
      </Layout>
   );
};
