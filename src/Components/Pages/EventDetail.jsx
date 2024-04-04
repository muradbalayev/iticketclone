/* eslint-disable react/prop-types */

import Icon from 'react-icons-kit'
import posterwide from '../Images/ZoRQOrI142gHqgRHD6Wa9aVSFzAraiNe2BwCeSH5.jpg'
import poster from '../Images/bznVyxd836vkSNoEVOHHhi4QdQN8IL433kW8BOpp.jpg'
import { heart } from 'react-icons-kit/feather/heart'
import {share} from 'react-icons-kit/feather/share'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const EventDetail = ({category}) => {
    const {language} = useParams()
    const [eventDetail, setEventDetail] = useState([]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                let url = `https://api.iticket.az/${language}/v5/events?client=web`;

                if (category) {
                    url += `&category_slug=${category}`
                  }
            
                  const response = await axios.get(url);
                setEventDetail(response.data); // Assuming your API response contains the event details
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
                <img className="lg:block hidden w-full rounded-2xl" alt='posterwide' src={posterwide} />
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
        </div>
    )
}

export default EventDetail
