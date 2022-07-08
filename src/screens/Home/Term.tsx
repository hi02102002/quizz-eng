import { IStudyModuleWithUser } from '@shared/types';
import Link from 'next/link';

interface Props {
   term: IStudyModuleWithUser;
}

const Term = ({ term }: Props) => {
   return (
      <Link href={`/term/${term.id}`}>
         <a className="block">
            <div className="shadow-card rounded bg-white py-3 px-4">
               <div className="h-[8.25rem] flex flex-col">
                  <div>
                     <h3 className="text-lg font-bold">{term.title}</h3>
                     <span className="text-sm font-semibold text-[#939bb4]">
                        {term.numOfLexicon} terms
                     </span>
                  </div>
               </div>
            </div>
         </a>
      </Link>
   );
};

export default Term;
