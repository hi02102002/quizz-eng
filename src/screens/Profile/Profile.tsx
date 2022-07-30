import { Layout, Term } from '@components';
import { ITermWithUser, IUser } from '@shared/types';
import Image from 'next/image';

interface Props {
   user: IUser;
   terms: Array<ITermWithUser>;
}

const Profile = ({ terms, user }: Props) => {
   return (
      <Layout>
         <div className="ui-container w-full md:py-10 py-4">
            <div className="flex items-center justify-center flex-col text-center gap-2 mb-10">
               <Image
                  src={user.avatar as string}
                  alt={user.username}
                  width={56}
                  height={56}
                  className="rounded-full"
               />
               <h3 className="font-bold text-xl">{user.username}</h3>
               <p className="text-sm">{user.email}</p>
            </div>
            <div>
               <h2 className="text-xl font-bold mb-6 text-center">Terms</h2>
               {terms.length > 0 ? (
                  <ul className="grid md:grid-cols-3 gap-4">
                     {terms.map((term) => {
                        return (
                           <li key={term.id}>
                              <Term term={term} />
                           </li>
                        );
                     })}
                  </ul>
               ) : null}
            </div>
         </div>
      </Layout>
   );
};

export default Profile;
