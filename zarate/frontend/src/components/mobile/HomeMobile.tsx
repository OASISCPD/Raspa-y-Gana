import { useEffect, useRef, useState } from 'react';
import img from '../../assets/imgs/titulo_alterno_0.png';
import imgSubtitle from '../../assets/imgs/titulo-2.png';
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
        console.log('',fetchPrize)
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

        Promise.all([loadImage(img), loadImage(imgRaspado), loadImage(fondoRaspaJuegoMobile)]).then(() => {
            setImagesLoaded(true)
        })

        return () => clearTimeout(timer)
    })
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
                            <div >
                                <TemplateScratch goToTemplateMail={changeImage} />
                            </div>
                        ) : (
                            <div className='px-5 py-[12rem]'>
                                <div className="flex flex-col text-center w-full mb-4 ">
                                    <img src={img} className="w-[30rem] mx-auto sm:w-[40rem]" alt="Titulo Alterno" />
                                    <img src={imgSubtitle} className="w-[16rem] mx-auto sm:w-[40rem] my-4" alt="Titulo Alterno" />
                                    <IoIosArrowDown size={70} className='z-[10]  mx-auto text-lime-500 animate-move-up-down opacity-animation ' />
                                    <button onClick={handlePlayScratch} className='rounded-3xl bg-gradient-to-r shadow-2xl  from-greenDark to-greenMain text-white mx-[6rem] py-2 my-4 text-xl items-center '>Jugar</button>
                                </div>
                                {/*  <ScratchRaspada fetchPrize={fetchPrize} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick}/> */}
                            </div>
                        )}
                    </div>
                    <Footer /* whatsapp='https://api.whatsapp.com/send/?phone=5491169392978&text&type=phone_number&app_absent=0' */ instagram='https://www.instagram.com/oasiszarate/' facebook='https://www.facebook.com/oasiszarate' />
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
