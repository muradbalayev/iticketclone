/* eslint-disable react/prop-types */

import Icon from 'react-icons-kit'
import posterwide from '../Images/ZoRQOrI142gHqgRHD6Wa9aVSFzAraiNe2BwCeSH5.jpg'
import poster from '../Images/bznVyxd836vkSNoEVOHHhi4QdQN8IL433kW8BOpp.jpg'
import artistimage from '../Images/RYUXEJU1lwFIFaDdw1k8Zu5ELYNlmzIuX82v6AfZ.png'
import { heart } from 'react-icons-kit/feather/heart'
import { share } from 'react-icons-kit/feather/share'
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
import lightboximg from '../Images/lightbox.jpg'
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const EventDetail = ({ category }) => {
    const { language, page } = useParams()
    const [eventDetail, setEventDetail] = useState([]);
    const [title1, setTitle1] = useState(true);
    const [title2, setTitle2] = useState(false);

    const title1Toggle = () => {
        setTitle1(true);
        setTitle2(false);
    }
    const title2Toggle = () => {
        setTitle1(false);
        setTitle2(true);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleLightbox = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        setLocations([
            {
                map_lat: 40.3767902,
                map_lng: 49.8409054
            }
        ]);
    }, []);

  useEffect(() => {
    if (locations.length > 0) {
        const map = L.map('map').setView([locations[0].map_lat, locations[0].map_lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        locations.forEach(location => {
            L.marker([location.map_lat, location.map_lng]).addTo(map);
        });
        return () => {
            map.remove();
        };
    }
}, [locations]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                // https://api.iticket.az/az/v5/events?client=web&category_slug=concerts&venue_id=352&page=1&venue_id=352&min_price=7&max_price=10
                let url = `https://api.iticket.az/${language}/v5/events?client=web`;

                if (category) {
                    url += `&category_slug=${category}`
                }
                if (page) {
                    url += `&page=${page}`
                }

                const response = await axios.get(url);
                setEventDetail(response.data.response.data.events.data);
            } catch (error) {
                console.error('Error fetching event detail:', error);
            }
        };

        fetchEventDetail();
    }, [language, category, page]);
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
                            <img src={venuesvg} />
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                            <img src={datesvg} />
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
                            <img src={agesvg} />
                            <span className="absolute text-white font-medium">6+</span>
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                            <img src={localesvg} />
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
                            <img src={currencysvg} />
                        </span>
                        <span className="icon z-10 -ml-12 w-20 h-20 flex justify-center items-center">
                            <img src={ticketssvg} />
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
                            <img src={infosvg} />
                        </span>

                        <div className="flex-1 pl-1">
                            <div className="title !mb-0 flex flex-col font-medium text-lg">
                                <span>Tədbir haqqında</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail grid grid-cols-1 lg:grid-cols-12 gap-10 lg:pt-10 order-4'>
                    <div className='lg:col-span-7'>
                        <div className='list'>
                            <div className='list-header gap-5 mb-5 md:flex'>
                                <button onClick={title1Toggle} className={`list-title bg-white grow ${title1 ? 'active' : ''} rounded-3xl`}>
                                    <h2 className='p-5 text-center'>
                                        <p className='text-xl font-bold '>
                                            Tədbir haqqında
                                        </p>
                                    </h2>
                                </button>
                                <button onClick={title2Toggle} className={`list-title bg-white ${title2 ? 'active' : ''} grow rounded-3xl`}>
                                    <h2 className='p-5 text-center'>
                                        <p className='text-xl font-bold '>
                                            Yaş məhdudiyyəti / Dil
                                        </p>
                                    </h2>
                                </button>
                            </div>
                            <div className='list-body flex flex-col grow gap-5 overflow-hidden mb-8 md:mb-0 h-full'>
                                <div className='list-content flex h-full min-h-72 p-5 bg-white rounded-3xl md:overflow-hidden'>
                                    {title1 &&
                                        <div className='md:h-full overflow-auto w-full'>
                                            <p className='mb-4'>“Heç vaxt”, “Ömrün baharları”, “Dəşti Təsnifi” kimi mahnıları ilə gənclərin sevimlisinə çevrilən Joseph Abbas “XG Club Cafe”də sevənləri ilə görüşəcək. Sizi gözəl musiqilərdən zövq almağa dəvət edirik.</p>
                                            <p className='mb-4'></p>
                                            <p className='mb-4'></p>
                                            <p className='mb-4'></p>
                                        </div>
                                    }
                                    {title2 &&
                                        <div className='md:h-full overflow-auto w-full'>
                                            <p className='mb-4'>16+ / Azərbaycanca</p>
                                            <p className='mb-4'></p>
                                            <p className='mb-4'></p>
                                            <p className='mb-4'></p>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='light-box mt-5'>
                            <div onClick={toggleLightbox} className='light-box-img max-w-32 max-h-32 rounded-3xl overflow-hidden  cursor-pointer'>
                                <img src={lightboximg} alt='gallery' className='object-contain' />
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-5'>
                        <div className='artist-image relative'>
                            <img src={artistimage} alt='artistimage' className='h-full object-contain object-bottom w-full z-10' />
                        </div>

                    </div>
                </div>

            </div>
            <div className='content-container flex flex-col relative px-3 lg:px-0'>
                <div className='venue-detail'>
                    <hr className='my-10' />
                    <div className='venue'>
                        <h1 className='venue-title mb-8 text-3xl font-bold'>Məkan yeri</h1>
                        <div className='lg:grid-cols-12 my-10 grid grid-cols-1 gap-10 h-full'>
                            <div className="lg:col-span-7 z-0 flex min-h-72">
                                <div id='map' className="flex-1 map lg:h-full rounded-3xl">
                                </div>
                            </div>
                            <div className='lg:col-span-5 bg-white flex flex-col venue-card py-4 px-6 shadow-md rounded-3xl'>
                                <div className="flex-1">
                                    <div className="venue-name text-2xl font-bold mb-2">
                                        <p > XG Club Cafe </p>
                                    </div>
                                    <div className="venue-address text-gray-500 mb-6 text-xl font-medium w-3/5">Səməd Vurğun küç., 36</div>
                                    <div className="venue-phones">
                                        <div className="title mb-1 font-bold text-xl">Mobil</div>
                                        <p className='text-gray-500'>
                                            +994 10 212 59 99
                                        </p>
                                    </div>
                                </div>
                                    <a href={`https://maps.google.com/maps?q=40.3767902,49.8409054`} target="_blank" className="btn mt-2">
                                        <button className='orange rounded-full text-black text-xl font-bold py-4 px-12'>
                                    İstiqamət
                                        </button>
                                </a>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Lightbox
                slides={[{ src: lightboximg, caption: 'Image Caption' }]} // Add more images as needed
                open={isOpen}
                close={toggleLightbox}
                backdropCloseable={true}
            />

        </div>
    )
}

export default EventDetail
