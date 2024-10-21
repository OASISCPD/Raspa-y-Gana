import { useEffect, useRef, useState } from 'react';
import imgSecond from '../../assets/imgs/titulo_01.png';
import img from '../../assets/imgs/titulo_encontra_RASPA.png'
import imgSubTitle from '../../assets/imgs/titulo-2.png'
import imgRaspado from '../../assets/imgs/fondo-raspada.jpg';
import imgTemplateMail from '../../assets/imgs/fondoFormSinMobile.png'
import fondoRaspaJuegoMobile from '../../assets/imgs/fondoBannerMobile.png';
import fondoRaspaJuegoMobileScratch from '../../assets/imgs/fondoRaspaJuegoMobile.png';
import { Footer } from '../Footer';
import { ModalAge } from '../modals/ModalAge';
import { useNavigate } from 'react-router-dom';
import { LoadingInit } from '../loading/LoadingInit';
import { TemplateScratch } from './TemplateScratch';
import { IoIosArrowDown } from "react-icons/io";

export function HomeMobile() {
    //logica de imagenes front
    const [showFirstImage, setShowFirstImage] = useState(true);
    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)

    const navigate = useNavigate();
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    const [showScratch, setShowScratch] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoMobile);
    //loading que maneja el TemplateInit
    const [templateLoading, setTemplateLoading] = useState<boolean>(false)
    //constante q maneja el smoth del componente
    const sectionRef = useRef<HTMLDivElement>(null)
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);
    console.log(showFirstImage)
    const handlePlayScratch = () => {
        setTemplateLoading(true)
        setTimeout(() => {
            setShowScratch(true);
            setBackgroundImage(fondoRaspaJuegoMobileScratch);
            setTemplateLoading(false)
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            // Scroll suave hacia la sección
        }, 1000);
    };

    const handleAgeConfirmation = () => {
        localStorage.setItem('isAdult', 'true');
        setFetchPrize(true)
        setShowAgeModal(false);
    };

    const handleAgeRejection = () => {
        localStorage.removeItem('isAdult');
        setShowAgeModal(true);
        navigate('/minorAge');
    };

    function changeImage() {
        setBackgroundImage(imgTemplateMail);
        console.log('loremIPsum cambiando image', fetchPrize)
    }

    useEffect(() => {
        if (imagesLoaded && minimumTimeElapsed) {
            const isAdult = localStorage.getItem('isAdult');
            if (isAdult !== 'true') {
                setShowAgeModal(true);
            } else {
                setFetchPrize(true);
            }
        }
    }, [imagesLoaded, minimumTimeElapsed]);
    //Carga logica de imagenes para mostrar el template solo cuando las imagenes esten cargadas 
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimunTimeElapsed(true)
        }, 1500)

        const loadImage = (src: any) => {
            return new Promise((resolve) => {

                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src
            })
        }

        Promise.all([loadImage(imgSecond), loadImage(imgRaspado), loadImage(fondoRaspaJuegoMobile)]).then(() => {
            setImagesLoaded(true)
        })

        return () => clearTimeout(timer)
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFirstImage(false);
        }, 4250); // Cambia a 2000ms (2 segundos) o al tiempo de tu animación

        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {!imagesLoaded || !minimumTimeElapsed || templateLoading ? (
                <LoadingInit />
            ) : (
                <section

                    className="text-gray-600 body-font relative"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className="  mx-auto textGothamMedium relative">
                        {showScratch ? (
                            <div className=''>
                                <TemplateScratch goToTemplateMail={changeImage} />
                            </div>
                        ) : (
                            <div className='px-4 py-[6rem]'>
                                <div className="flex flex-col text-center w-full mb-4 ">
                                    {/*   <img src={imgLogo} className="w-[22rem] mx-auto py-[0rem] " alt="Titulo Alterno" /> */}
                                    <div className="pt-[3rem] text-center">
                                        <img
                                            src={img}
                                            className="w-[20rem] mx-auto animate-spin-once"
                                            alt="Titulo Alterno"
                                        />
                                    </div>
                                    <div className='py-[2rem]'>
                                        <img src={imgSubTitle} className="w-[16rem] mx-auto" alt="" />
                                    </div>
                                    {/* <h1 className='text-white font-bold text-lg py-1 bg-gray-900 bg-opacity-20 rounded-full'>PODÉS GANAR HASTA $20000 PARA USAR EN NUESTROS JUEGOS</h1> */}
                                    <IoIosArrowDown size={70} className='z-[10]  mx-auto text-roseMain animate-move-up-down opacity-animation ' />
                                    <div className='py-[1rem] pb-[4rem]'>
                                        <button onClick={handlePlayScratch} className='rounded-3xl bg-gradient-to-r shadow-2xl shadow-gray-500 from-greenMain to-greenDark text-white py-2 my-4 text-base inline-block mx-auto px-[3rem] uppercase '>Jugar</button>
                                    </div>
                                </div>
                                {/*  <ScratchRaspada fetchPrize={fetchPrize} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick}/> */}
                            </div>
                        )}
                    </div>
                    <Footer whatsapp='https://api.whatsapp.com/send/?phone=543873088660&text&type=phone_number&app_absent=0' instagram='https://www.instagram.com/nuevocasinoalberdi/' facebook='https://www.facebook.com/nuevocasinoalberdi' />
                </section>
            )}

            {showAgeModal && (
                <ModalAge
                    onClose={handleAgeRejection}
                    onCloseOk={handleAgeConfirmation}
                    title="¿SOS MAYOR DE 18 AÑOS?"
                />
            )}
        </div>
    );
}
