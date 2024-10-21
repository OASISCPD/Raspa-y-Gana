import { useEffect, useRef, useState } from 'react';
import imgSecond from '../../assets/imgs/titulo_01.png';
import img from '../../assets/imgs/titulo_encontra_RASPA.png'
import imgSubTitle from '../../assets/imgs/titulo-2.png'
import imgRaspado from '../../assets/imgs/fondo-raspada.jpg';
import fondoRaspaJuegoMobileScratch from '../../assets/imgs/fondoRaspaJuegoTablet.png';
import { Footer } from '../Footer';
import { ModalAge } from '../modals/ModalAge';
import { useNavigate } from 'react-router-dom';
import { LoadingInit } from '../loading/LoadingInit';
import { ScratchRaspadaScanAndWin } from '../Scratch/ScratchScanAndWin';
import { TemplateMailMobile } from './TemplateMailMobile';

export function HomeTabletScanAndWin() {
    //logica de imagenes front
    const [showFirstImage, setShowFirstImage] = useState(true);
    console.log(showFirstImage)
    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)

    const navigate = useNavigate();
    const [showAgeModal, setShowAgeModal] = useState<boolean>(false);
    const [showScratch, setShowScratch] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoMobileScratch);
    //loading que maneja el TemplateInit
    const [templateLoading, setTemplateLoading] = useState<boolean>(false)
    //constante q maneja el smoth del componente
    const sectionRef = useRef<HTMLDivElement>(null)
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);
    console.log(fetchPrize)
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

  /*   function changeImage() {
        setBackgroundImage(imgTemplateMail);
    } */

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

        Promise.all([loadImage(imgSecond), loadImage(imgRaspado), loadImage(fondoRaspaJuegoMobileScratch)]).then(() => {
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
                            <div ref={sectionRef} className='px-[1rem] sm:px-[3rem]'>
                                <TemplateMailMobile />
                            </div>
                        ) : (
                            <div className='px-[1rem] py-[2rem]'>
                                <div className="flex flex-col text-center w-full mb-4 sm:mb-0 ">
                                    <div className="text-center">
                                        <img
                                            src={img}
                                            className="w-[20rem] sm:w-[30rem] mx-auto animate-spin-once"
                                            alt="Titulo Alterno"
                                        />
                                    </div>
                                    <div className='py-[0rem]'>
                                        <img src={imgSubTitle} className="w-[16rem] sm:w-[20rem] mx-auto" alt="" />
                                    </div>
                                    <div className='py-[1rem]'>
                                        <ScratchRaspadaScanAndWin fetchPrize={true} imgRaspado={imgRaspado} buttonGetPrize={handlePlayScratch} />
                                    </div>
                                </div>
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
