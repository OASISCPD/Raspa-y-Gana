import { useEffect, useRef, useState } from 'react';
import img from '../../assets/imgs/titulo_alterno_01.png';
import imgSubtitle from '../../assets/imgs/titulo-2.png';
import imgRaspado from '../../assets/imgs/fondo-raspada.jpg';
import imgTemplateMail from '../../assets/imgs/fondoFormSinDesktop.png'
import fondoRaspaJuegoMobile from '../../assets/imgs/fondoBannerDesktop.png';
import fondoRaspaJuegoDesktopScratch from "../../assets/imgs/fondoRaspaJuegoDesktop.png"
import { Footer } from '../Footer';
import { ModalAge } from '../modals/ModalAge';
import { useNavigate } from 'react-router-dom';
import { LoadingInit } from '../loading/LoadingInit';
import { TemplateScratch } from '../mobile/TemplateScratch';
import { IoIosArrowDown } from 'react-icons/io';
export function HomeDesktop() {
    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)
    const [showScratch, setShowScratch] = useState(false);
    //loading que maneja el TemplateInit
    const [templateLoading, setTemplateLoading] = useState<boolean>(false)
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoMobile);
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
        console.log('', fetchPrize)
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
                        minHeight: '100dvh',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className={` px-5 py-[4rem] md:py-[4rem]  lg:py-[4rem] xl:py-[8rem] 2xl:py-[16rem] ${showScratch ? "ml-auto mr-auto" : "ml-[30rem] xl:ml-[40rem] 2xl:ml-[52rem]"} textGothamMedium`}>
                        {showScratch ? (
                            <TemplateScratch goToTemplateMail={changeImage} />
                        ) : (
                            <>
                                <div className='px-5 lg:py-[0rem]'>
                                    <div className="flex flex-col text-center w-full mb-4 ">
                                        <img src={img} className="w-[30rem] mx-auto sm:w-[24rem] 2xl:w-[40rem]" alt="Titulo Alterno" />
                                        <img src={imgSubtitle} className="w-[16rem] mx-auto sm:w-[16rem] 2xl:w-[24rem]  my-4" alt="Titulo Alterno" />
                                        <IoIosArrowDown size={70} className='z-[10]  mx-auto text-lime-500 animate-move-up-down opacity-animation ' />
                                        <button onClick={handlePlayScratch} className='rounded-3xl bg-gradient-to-r shadow-2xl  from-greenDark to-greenMain hover:scale-95 duration-300 text-white mx-[8rem] 2xl:mx-[16rem]  py-2 my-4 text-base xl:text-lg 2xl:text-xl items-center '>Jugar</button>
                                    </div>
                                    {/*  <ScratchRaspada fetchPrize={fetchPrize} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick}/> */}
                                </div>
                            </>
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
