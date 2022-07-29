import { Layout } from '@components';
import { ITermWithUser, IUser } from '@shared/types';
import Image from 'next/image';

interface Props {
   user: IUser;
   terms: Array<ITermWithUser>;
}

const Profile = ({ terms, user }: Props) => {
   return (
      <Layout>
         <div>
            <Image
               src={user.avatar as string}
               alt={user.username}
               width={56}
               height={56}
            />
            <h3>{user.username}</h3>
            <span>{user.email}</span>
         </div>
      </Layout>
   );
};

export default Profile;
