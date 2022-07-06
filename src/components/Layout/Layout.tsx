import Header from '../Header';

interface Props {
   children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
   return (
      <>
         <Header />
         <main className="mt-header">{children}</main>
      </>
   );
};

export default Layout;
