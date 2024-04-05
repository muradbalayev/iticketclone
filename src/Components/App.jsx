
import { Route, Routes, useParams } from 'react-router-dom';
import './App.scss';
import EventPage from './Pages/EventPage';
import Header from './Header';
import Footer from './Footer';
import AllEvents from './Pages/AllEvents';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Home from './Pages/Home';
import EventDetail from './Pages/EventDetail';



function App() {
  const { language, category } = useParams()
  console.log(language)
  
  return (
    <div className='relative'>
      <Header/>
      <Routes>
      <Route path="/" element={<Home language={language} />} exact/>
      <Route path="/:language" element={<AllEvents/>} exact/>
      <Route path="/:language/:category" element={<EventPage/>} exact/>
      <Route path='/:language/:category/:slug/:page' element={<EventDetail category={category}/>} exact />
      <Route path='/:language/cart' element={<Cart/>} exact/>
      <Route path='/:language/favorites' element={<Favorites/>} exact/>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
