import { useEffect, useRef, useState } from 'react';
import imgSecond from '../../assets/imgs/titulo_01.png';
import imgLogo from '../../assets/imgs/logo_blanco.png'
import imgFirst from '../../assets/imgs/titulo_0.png';
import imgRaspado from '../../assets/imgs/fondo-raspada.png';
import imgTemplateMail from '../../assets/imgs/fondoFormSinMobile.png'
import fondoRaspaJuegoDesktop from '../../assets/imgs/fondoBannerDesktop.png';
import fondoRaspaJuegoDesktopScratch from '../../assets/imgs/fondoRaspaJuegoDesktop.png';
import { Footer } from '../Footer';
import { ModalAge } from '../modals/ModalAge';
import { useNavigate } from 'react-router-dom';
import { LoadingInit } from '../loading/LoadingInit';
import { TemplateScratch } from '../mobile/TemplateScratch';
import { IoIosArrowDown } from 'react-icons/io';
export function HomeDesktop() {
    //logica de imagenes front
    const [showFirstImage, setShowFirstImage] = useState(true);
    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)
    const [showScratch, setShowScratch] = useState(false);
    //loading que maneja el TemplateInit
    const [templateLoading, setTemplateLoading] = useState<boolean>(false)
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoDesktop);
    const navigate = useNavigate();
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement>(null)
    //constante q maneja el fetch del scratch
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);

    const handlePlayScratch = () => {
        setTemplateLoading(true)
        setTimeout(() => {
            setShowScratch(true);
            setBackgroundImage(fondoRaspaJuegoDesktopScratch);
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

    /* useEffect(() => {
        const isAdult = localStorage.getItem('isAdult');
        if (isAdult !== 'true') {
            setShowAgeModal(true);
        }
        else {
            setFetchPrize(true)
        }
    }, []); */
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

        Promise.all([loadImage(imgSecond), loadImage(imgRaspado), loadImage(fondoRaspaJuegoDesktop)]).then(() => {
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
        <div className='flex flex-col min-h-screen'>
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
                        minHeight: '100dvh',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className={` px-5  ${showScratch ? "mx-auto" : "mx-auto"} textGothamMedium`}>
                        {showScratch ? (
                            <TemplateScratch goToTemplateMail={changeImage} />
                        ) : (
                            <>
                                <div className='px-5 '>
                                    <div className="flex flex-col lg:py-[1rem] xl:py-[1.5rem] text-center w-full  ">
                                        <img src={imgLogo} className="sm:w-[30rem] 2xl:w-[40rem] mx-auto pt-[2rem] " alt="Titulo Alterno" />
                                        <div className="text-center">
                                            {showFirstImage ? (
                                                <img
                                                    src={imgFirst}
                                                    className="w-[20rem] xl:w-[30rem] mx-auto animate-spin-once"
                                                    alt="Titulo Alterno"
                                                />
                                            ) : (
                                                <img
                                                    src={imgSecond}
                                                    className="w-[20rem] xl:w-[30rem] mx-auto"
                                                    alt="Titulo Alterno"
                                                />
                                            )}
                                        </div>
                                        <div className='mx-auto'>
                                            <h1 className='text-white font-bold text-base xl:text-xl py-4 bg-gray-900 bg-opacity-20 rounded-full'>PODÉS GANAR HASTA $20000 <br /> PARA USAR EN NUESTROS JUEGOS</h1>
                                        </div>
                                        <IoIosArrowDown size={70} className='z-[10]  mx-auto text-roseMain animate-move-up-down opacity-animation ' />
                                        <div className='py-[1rem] lg:pb-[16rem] xl:pb-[8rem] 2xl:pb-[12rem]'>
                                            <button onClick={handlePlayScratch} className='rounded-3xl bg-gradient-to-r shadow-2xl shadow-gray-500 from-redMain to-roseMain text-white py-2 my-4 text-sm xl:text-lg inline-block mx-auto px-[3rem] uppercase '>Jugar</button>
                                        </div>
                                    </div>
                                    {/*  <ScratchRaspada fetchPrize={fetchPrize} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick}/> */}
                                </div>
                            </>
                        )}
                    </div>
                    <Footer whatsapp='https://api.whatsapp.com/send/?phone=5491169392978&text&type=phone_number&app_absent=0' instagram='https://www.instagram.com/bingooasispilar/' facebook='https://www.facebook.com/BingoOasisPilar' />
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
