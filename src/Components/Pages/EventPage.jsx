import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Select from 'react-select'
import DatePicker from "react-multi-date-picker";
import { useParams } from 'react-router-dom';
import noposter from '../Images/no-app-poster.png'
import warning from "../Images/warning.svg"
import { RangeSlider } from 'rsuite';
import 'rsuite/RangeSlider/styles/index.css';


// import RangeSlider from 'react-range-slider-input';



const EventPage = () => {

  const { category } = useParams();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPriceAPI, setMinPriceAPI] = useState(null)
  const [maxPriceAPI, setMaxPriceAPI] = useState(null);
  const [pageTitle, setPageTitle] = useState('');
  const [showWarning, setShowWarning] = useState(false);



  const fetchData = useCallback(async (pageNumber, category, startDate, endDate, venueId, minPrice, maxPrice) => {
    try {
      setLoading(true);
      let url = `https://api.iticket.az/az/v5/events?client=web`;
      if (category) {
        url += `&category_slug=${category}`
      }

      if (pageNumber > 1) {
        url += `&page=${pageNumber}`
      }

      if (startDate) {
        url += `&start_date=${formatDate(startDate)}`;
      }

      if (endDate) {
        url += `&end_date=${formatDate(endDate)}`;
      }


      if (venueId) {
        url += `&venue_id=${venueId}`;
      }


      if ((minPrice !== null || maxPrice !== null) && (minPrice !== minPriceAPI || maxPrice !== maxPriceAPI)) {
        url += `&min_price=${minPrice}&max_price=${maxPrice}`;
      }

      const response = await axios.get(url);

      setMinPriceAPI(Number(response.data.response.prices.min));
      setMaxPriceAPI(Number(response.data.response.prices.max));

      if ((minPrice === null) && (maxPrice === null)) {
        setMinPrice(Number(response.data.response.prices.min));
        setMaxPrice(Number(response.data.response.prices.max));
      }

      const venueNames = response.data.response.venues.map(venue => ({ value: venue.id, label: venue.name }));
      setPageTitle(response.data.response.category.name)
      setVenues(venueNames);

      if (pageNumber === 1) {
        setEvents(response.data.response.events.data);
      } else {
        setEvents(prevEvents => [...prevEvents, ...response.data.response.events.data]);
      }

      setHasMore(response.data.response.events.data.length > 0);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setShowWarning(true), 1000);
    }
  }, [minPriceAPI, maxPriceAPI]);


  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };


  const handleVenueChange = selectedOption => {
    setSelectedVenue(selectedOption);
    setPage(1)
  };

  const handleDateChange = (dates) => {
    if (dates.length === 1) {
      setStartDate(dates[0]);
      setEndDate(null);
    } else if (dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const formatDate = date => {
    const formattedDate = new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate.split('.').join('.');
  };

  useEffect(() => {
    setStartDate(null)
    setEndDate(null)
    setSelectedVenue(category);
    setPage(1)
    setMaxPriceAPI(null)
    setMinPriceAPI(null)
    setMaxPrice(null)
    setMinPrice(null)

  }, [category]);


  useEffect(() => {
    fetchData(page, category, startDate, endDate, selectedVenue ? selectedVenue.value : null, minPrice, maxPrice);
  }, [fetchData, page, category, startDate, endDate, selectedVenue, minPrice, maxPrice]);



  const handleSliderChange = (values) => {
    const [minValue, maxValue] = values;
    if (minPrice !== null && maxPrice !== null) {
      setMinPrice(minValue);
      setMaxPrice(maxValue);
    }
  };

  // console.log(`MinPrice ${minPrice}`)
  // console.log(`MaxPrice ${maxPrice}`)


  return (
    <div>
      <div className="content-container lg:px-5 px-3 mx-auto pt-7 lg:pt-12 pb-6">
        <h1 className="page-title">{pageTitle} </h1>
      </div>
      <div className="content-container concert-filter mx-auto pt-7 px-3 lg:px-0 lg:pt-12 pb-6">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className='form-control flex items-center shadow-md'>
            <Select classNamePrefix="react-select"
              placeholder='Məkanı seçin'
              className='react-select-container z-20 w-full text-start'
              options={venues}
              onChange={handleVenueChange}
              value={selectedVenue} />
          </div>
          <div className='form-control flex items-center shadow-md'>
            <DatePicker
              value={[startDate, endDate]}
              onChange={handleDateChange}
              format="DD MMM YYYY"
              maxDate={endDate}
              multiple={false}
              placeholder='Tarix aralığını seçin'
              containerClassName='DatePicker myDatePicker'
              inputClass='DatePicker'
              minDate={new Date()}
              range
              dateSeparator=" - "
            />
          </div>
          <div className='form-control relative flex items-center shadow-md flex-col'>
            <input type='text' className='w-full text-center price-sorter'
              placeholder={
                (minPrice === null || maxPrice === null) ? '' : `Qiymət ${minPrice} ₼-dan ${maxPrice} ₼-dək`
              }
              readOnly />
              {(minPrice !== null || maxPrice !== null) &&
            <RangeSlider className='w-full absolute -bottom-5'
              min={minPriceAPI}
              max={maxPriceAPI}
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange} /> }
          </div>
        </div>
      </div>
      <div className='events-list lg:pt-10 pt-5'>
        <div className='content-container lg:px-5 px-6'>
          <div>
            {events.length > 0 ? (
              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10'>
                {events.map(event => (
                  <a key={event.id} href='!#' className='event-list-item'>
                    <div className='relative'>
                      <div className='image'>
                        <img
                          src={noposter}
                          alt='bg'
                          className='bg'
                          onLoad={(e) => { e.target.src = event.poster_bg_url; }}
                        />
                        <img
                          src={noposter}
                          alt='pic'
                          className='op'
                          onLoad={(e) => { e.target.src = event.poster_url; }}

                        />
                        <span className={`btn text-lg lg:py-2 lg:px-4 absolute lg:right-7 lg:bottom-7 z-20 orange rounded-full py-2 px-4 font-bold bottom-5 right-5`}>
                          <span className="price whitespace-nowrap">{event.min_price} ₼</span>-dan
                        </span>
                      </div>
                      <div className='info lg:p-8 lg:text-xl'>
                        <p className="event-name lg:pt-2 text-white">
                          {event.name}
                        </p>
                        <div className="flex w-full items-center flex-1">
                          <div className="event-date">
                            {new Date(event.event_starts_at).toLocaleDateString('tr-TR', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="venue-name ms-1">
                            • {event.venues && event.venues.length > 0 ? event.venues[0].name : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (showWarning && <div className='warning mt-7 relative flex items-center gap-2'>
              <img src={warning} alt='warning' className='w-8' />
              <p className='font-medium text-lg'>Sorğunuza uyğun tədbir tapılmadı.</p>
            </div>
            )}
          </div>
        </div>
        <div className='mt-10 w-full flex justify-center'>
          {loading && <button className='load-more orange mx-auto text-xl lg:py-4 lg:px-6 rounded-full font-bold py-2 px-4 cursor-none'>
            Yüklənir...
          </button>}

          {hasMore && !loading && (
            <button onClick={handleLoadMore} className='load-more orange mx-auto text-xl lg:py-4 lg:px-6 rounded-full font-bold py-2 px-4'>
              Daha çox
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventPage