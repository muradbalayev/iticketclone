/* eslint-disable react/prop-types */

import Icon from 'react-icons-kit'
import posterwide from '../Images/ZoRQOrI142gHqgRHD6Wa9aVSFzAraiNe2BwCeSH5.jpg'
import poster from '../Images/bznVyxd836vkSNoEVOHHhi4QdQN8IL433kW8BOpp.jpg'
import { heart } from 'react-icons-kit/feather/heart'
import {share} from 'react-icons-kit/feather/share'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import venuesvg from '../Images/venue.svg'
import datesvg from '../Images/date.svg'
import agesvg from '../Images/age.svg'
import localesvg from '../Images/locale.svg'
import currencysvg from '../Images/currency.svg'
import infosvg from '../Images/info.svg'
import ticketssvg from '../Images/tickets.svg'



const EventDetail = ({category}) => {
    const {language} = useParams()
    const [eventDetail, setEventDetail] = useState([]);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                let url = `https://api.iticket.az/${language}/v5/events?client=web`;

                if (category) {
                    url += `&category_slug=${category}`
                  }
            
                  const response = await axios.get(url);
                setEventDetail(response.data.response.data.events); // Assuming your API response contains the event details
            } catch (error) {
                console.error('Error fetching event detail:', error);
            }
        };

        fetchEventDetail();
    }, [language, category]);
    console.log(eventDetail);

    return (
        <div className="event-detail">
            <div className="event-image mb-10 lg:p-5 overflow-hidden mx-auto relative w-full">
                <img className="lg:block hidden w-full rounded-2xl shadow-md" alt='posterwide' src={posterwide} />
                <img className='lg:hidden block w-full' alt='poster' src={poster} />
                <div className='info absolute lg:left-0 lg:right-0 lg:bottom-5 lg:py-10 lg:px-5 xl:py-20 xl:px-0'>
                    <div className='content-container lg:flex hidden items-center justify-start gap-3 lg:px-5'>
                        <span className={`btn text-xl lg:py-4 lg:px-6  z-20 orange rounded-full py-2 px-4 font-bold`}>
                            <span className="price whitespace-nowrap">{language === 'en' ? 'from' : ''}  {language === 'ru' ? 'от' : ''}  4 ₼</span>{language === 'az' ? '-dan' : ''}
                        </span>
                        <a href={`/${language}/favorites`}>
                            <button className='p-5 group hover:bg-white hover:border-amber-400 transition duration-300 flex items-center justify-center lg:h-16 lg:w-16 lg:border-4 rounded-full'>
                                <Icon className='text-white group-hover:text-amber-400 transition' size={22} icon={heart} />
                            </button>
                        </a>
                        <button className='p-5 flex items-center justify-center group hover:bg-white hover:border-amber-400 transition duration-300 lg:h-16 lg:w-16 lg:border-4 rounded-full'>
                                <Icon className='text-white group-hover:text-amber-400 transition' size={24} icon={share} />
                            </button>

                    </div>
                </div>
            </div>
            <div className='content-container flex flex-col relative px-3 lg:px-0'>
                <div className='event-chips grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-11 md:grid order-4 lg:order-1'>
                    <div className='info-block flex items-center rounded-3xl p-2 bg-white shadow-xl'>
                    <span className="icon z-20 w-20 h-20 flex justify-center items-center">
                        <img src={venuesvg}/>
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                        <img src={datesvg}/>
                        </span>
                        <div className="flex-1 pl-1">
                            <div className="title !mb-0 flex flex-col font-medium text-lg">
                                <span>Məkan</span>
                                 <span>Tarix</span>
                                 </div>
                                 </div>
                    </div>
                    <div className='info-block flex items-center rounded-3xl p-2 bg-white shadow-xl'>
                    <span className="icon z-20 w-20 h-20 flex justify-center items-center">
                        <img src={agesvg}/>
                        <span className="absolute text-white font-medium">6+</span>
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                        <img src={localesvg}/>
                        </span>
                        <div className="flex-1 pl-1">
                            <div className="title !mb-0 flex flex-col font-medium text-lg">
                                <span>Dil</span>
                                 <span>Yaş məhdudiyyəti</span>
                                 </div>
                                 </div>
                    </div>
                    <div className='info-block flex items-center rounded-3xl p-2 bg-white shadow-xl'>
                    <span className="icon z-20 w-20 h-20 flex justify-center items-center">
                        <img src={currencysvg}/>
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                        <img src={ticketssvg}/>
                        </span>
                        <div className="flex-1 pl-1">
                            <div className="title !mb-0 flex flex-col font-medium text-lg">
                                <span>Qiymət</span>
                                 <span>Biletlər haqda</span>
                                 </div>
                                 </div>
                    </div>
                    <div className='info-block flex items-center rounded-3xl p-2 bg-white shadow-xl'>
                    <span className="icon z-20 w-20 h-20 flex justify-center items-center">
                        <img src={infosvg}/>
                        </span>
                     
                        <div className="flex-1 pl-1">
                            <div className="title !mb-0 flex flex-col font-medium text-lg">
                                <span>Tədbir haqqında</span>
                                 </div>
                                 </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetail
