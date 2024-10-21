import { useEffect, useRef, useState } from 'react';
import imgSecond from '../../assets/imgs/titulo_01.png';
import imgSecondHome from '../../assets/imgs/titulo-2.png'
import imgFirst from '../../assets/imgs/titulo_encontra_RASPA.png';
import imgRaspado from '../../assets/imgs/fondo-raspada.jpg';
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
        console.log(showFirstImage)
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
        <div className='abo min-h-screen flex flex-col'>
            {!imagesLoaded || !minimumTimeElapsed || templateLoading ? (
                <LoadingInit />
            ) : (
                <section
                    className="text-gray-600 body-font relative flex-1 w-full h-full"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: 'auto',
                        width: '100%',
                        margin: 0,
                        padding: 0
                    }}
                >
                    <div className={` px-5 flex flex-col justify-center items-center  ${showScratch ? "ml-auto mr-auto" : "ml-[32rem] xl:ml-[40rem] 2xl:ml-[42rem]"} textGothamMedium`}>
                        {showScratch ? (
                            <TemplateScratch goToTemplateMail={changeImage} />
                        ) : (
                            <>
                                <div className='px-5 lg:py-[2rem] xl:py-[4rem] 2xl:py-[12rem]'>
                                    <div className="flex flex-col text-center w-full mb-4 ">
                                        <img src={imgFirst} className="animate-spin-once  lg:w-[26rem] mx-auto xl:w-[32rem] 2xl:w-[36rem]" alt="Titulo Alterno" />
                                        <img src={imgSecondHome} className="w-[16rem] mx-auto sm:w-[16rem] xl:w-[24rem] 2xl:w-[24rem]  my-4" alt="Titulo Alterno" />
                                        <IoIosArrowDown size={70} className='z-[10]  mx-auto text-roseMain animate-move-up-down opacity-animation ' />
                                        <button onClick={handlePlayScratch} className='rounded-3xl bg-gradient-to-r shadow-2xl  from-greenDark to-greenMain hover:scale-95 duration-300 text-white mx-[8rem] xl:mx-[10rem] 2xl:mx-[10rem]  py-2 my-4 text-base xl:text-2xl 2xl:text-2xl items-center uppercase'>Jugar</button>
                                    </div>
                                    {/*  <ScratchRaspada fetchPrize={fetchPrize} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick}/> */}
                                </div>
                            </>
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
