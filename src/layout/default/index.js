import { Outlet } from 'react-router-dom';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import '../../component/Global/style/GlobalStyle.scss'
export function LayoutDefault(){
  return (
    <>
      <div className="layout-default">
        <Header />
        <main className='layout-default__main'>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </>
  )
}