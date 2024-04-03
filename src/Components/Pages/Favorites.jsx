import warning from "../Images/warning.svg"

const Favorites = () => {
  return (
    <div>
       <div className="content-container px-5 mx-auto pt-7 lg:pt-9 pb-6">
        <h1 className="page-title">Seçilmişlər </h1>
      <div className='warning mt-12 relative flex items-center gap-2'>
              <img src={warning} alt='warning' className='w-8' />
              <p className='font-medium text-lg'>Seçiminizə uyğun tədbir tapılmadı.</p>
        </div>
      
      </div>
    </div>
  )
}

export default Favorites
