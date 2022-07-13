import Header from '../Header';

interface Props {
   children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
   return (
      <>
         <Header />
         <main className="mt-header min-h-[calc(100vh_-_63px)] flex flex-col">
            {children}
         </main>
      </>
   );
};

export default Layout;
