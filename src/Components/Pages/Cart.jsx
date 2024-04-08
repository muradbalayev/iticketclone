import { useParams } from "react-router-dom";
import warning from "../Images/warning.svg";
import translations from '../translations.json';
import { useEffect } from "react";
import { Helmet } from 'react-helmet';



const Cart = () => {
  const { language } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div>
        <Helmet>
        <title>Cart | iTicket.AZ</title>
      </Helmet>
      <div className="content-container lg:px-5 px-3 mx-auto pt-7 lg:pt-12 pb-6">
        <div className='bg-white rounded-3xl px-5 py-7'>
        <h1 className="page-title">{translations[language]['cart']}</h1>
      <div className='warning mt-7 relative flex items-center gap-2'>
              <img src={warning} alt='warning' className='w-8' />
              <p className='font-medium text-lg'>{translations[language]['carterror']}</p>
            </div> 
        </div>
      
      </div>
    </div>
  )
}

export default Cart
