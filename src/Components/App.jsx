
import { Route, Routes, useParams } from 'react-router-dom';
import './App.scss';
import EventPage from './Pages/EventPage';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import AllEvents from './Pages/AllEvents';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Home from './Pages/Home';
import EventDetail from './Pages/EventDetail';
import Icon from 'react-icons-kit'

import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart'




function App() {
  const { language, category } = useParams()
  console.log(language)
  
  return (
    <div className='relative'>
      <button className='cart-icon fixed h-14 w-14 orange mt-5 mr-5 mb-5 p-3 z-30 right-0 rounded-full bottom-0'>
        <Icon icon={ic_shopping_cart} size={27}/>
        <span className='rounded-full w-5 absolute top-0 right-0 bg-red-700 text-white text-sm'>0</span>
      </button>
      <Header/>
      <Routes>
      <Route path="/" element={<Home language={language} />} exact/>
      <Route path="/:language" element={<AllEvents/>} exact/>
      <Route path="/:language/:category" element={<EventPage/>} exact/>
      <Route path='/:language/:category/:slug' element={<EventDetail category={category}/>} exact />
      <Route path='/:language/cart' element={<Cart/>} exact/>
      <Route path='/:language/favorites' element={<Favorites/>} exact/>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
