

import Header from '@/app/components/Headerr'
import { getsettings } from '@/sanity/sanity.utils';
import Footer from './Footer';
export default async function Layout({ children }) {
  const settings = await getsettings()
  return (
    <>
    
      <Header settings={settings} />
      <main className='page-container'>{children}</main>
      <Footer/>
    </>
  );
}
