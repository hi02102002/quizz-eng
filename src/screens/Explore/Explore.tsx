import { Layout, Term } from '@components';
import { ITermWithUser } from '@shared/types';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useState } from 'react';

interface Props {
   terms: Array<ITermWithUser>;
   lastVisible: string;
}

const Explore = (props: Props) => {
   const [terms, setTerms] = useState<Array<ITermWithUser>>(props.terms);
   const [lastVisible, setLastVisible] = useState<
      QueryDocumentSnapshot<DocumentData>
   >(JSON.parse(props.lastVisible));

   return (
      <Layout>
         <div className="md:py-10 py-4 flex-1 items-center justify-center flex">
            <div className="ui-container w-full self-start">
               {terms.length ? (
                  <>
                     <h1 className="text-xl font-bold mb-6">Explore</h1>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {terms.map((term) => {
                           return (
                              <li key={term.id}>
                                 <Term term={term} />
                              </li>
                           );
                        })}
                     </ul>
                  </>
               ) : (
                  <div className="flex items-center justify-center text-center flex-col space-y-4 px-4">
                     <p className="text-lg font-semibold">
                        Don&apos;t have any term is public
                     </p>
                  </div>
               )}
            </div>
         </div>
      </Layout>
   );
};

export default Explore;
