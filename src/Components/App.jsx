
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import EventPage from './Pages/EventPage';
import Header from './Header';
import Footer from './Footer';
import AllEvents from './Pages/AllEvents';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';



function App() {
  return (
    <div className='relative'>
      <Header/>
      <Routes>
      <Route path="/" element={<AllEvents/>} exact/>
      <Route path="/:category" element={<EventPage/>} exact/>
      <Route path='/cart' element={<Cart/>} exact/>
      <Route path='/favorites' element={<Favorites/>} exact/>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
