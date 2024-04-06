import { useParams } from "react-router-dom"
import warning from "../Images/warning.svg"
import translations from '../translations.json'

const Favorites = () => {
  const  {language} = useParams()

    window.scrollTo(0, 0);

  return (
    <div>
       <div className="content-container px-5 mx-auto pt-7 lg:pt-9 pb-6">
        <h1 className="page-title">{translations[language]['favorites']}</h1>
      <div className='warning mt-12 relative flex items-center gap-2'>
              <img src={warning} alt='warning' className='w-8' />
              <p className='font-medium text-lg'>{translations[language]['cantfind']}</p>
        </div>
      
      </div>
    </div>
  )
}

export default Favorites
