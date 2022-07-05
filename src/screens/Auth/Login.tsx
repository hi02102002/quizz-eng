import { auth } from '@lib/firebase';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
const Login = () => {
   const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   return (
      <div>
         <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={() => signInWithEmailAndPassword(email, password)}>
            Login
         </button>
      </div>
   );
};

export default Login;
