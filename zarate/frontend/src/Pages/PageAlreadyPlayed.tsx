import { useEffect, useState } from 'react';
import imgTemplateMail from '../assets/imgs/fondoFormSinTablet.png';
import logo from '../assets/imgs/logo-oasiszarate-grande.png';
import { Footer } from '../components/Footer';
import { LoadingInit } from '../components/loading/LoadingInit';

export function PageAlreadyPlayed() {
    //VARIABLE QUE CAMBVIAN PARA MOSTRAR LAS IMAGENES Y EL TEMPLATE EN CUESTION
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, 1500); // 1000 milliseconds = 1 second

        const loadImage = (src: any) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src;
            });
        };

        Promise.all([loadImage(imgTemplateMail), loadImage(logo)])
            .then(() => {
                setImagesLoaded(true);
            });

        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {!imagesLoaded || !minimumTimeElapsed ? (
                <LoadingInit />
            ) : (
                <div className="flex flex-col min-h-screen"
                    style={{
                        backgroundImage: `url(${imgTemplateMail})`,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajusta el valor alpha según sea necesario
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className="flex-grow flex flex-col justify-center py-24 textGothamMedium">
                        <div className="relative z-20 mx-[2rem] text-start py-8 text-white">
                            <h1 className='text-xl sm:text-3xl text-center uppercase bg-black bg-opacity-10 rounded-3xl'>Esta promo es solo para personas que no hayan participado de las versiones anteriores de Raspá y Ganá</h1>
                            <div className='my-2 '></div>
                            <h1 className='text-base sm:text-xl text-center uppercase'>Pero no te preocupes entra a nuestra web y enterate de todas las cosas que tenemos para vos! </h1>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => window.open('https://oasiszarate.com.ar/')} className='text-white shadow-lg uppercase mt-8 bg-gradient-to-r hover:scale-95 duration-300 from-redMain to-roseMain border-0 py-2 mx-auto sm:mx-[4rem] rounded-3xl items-center text-lg px-8 sm:px-12 sm:text-2xl lg:text-lg xl:text-xl'>
                                Entrar a Oasis Zarate
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center mt-48 lg:mt-[8rem]'>
                            <img src={logo} alt="Logo Zarate" className='w-[20rem] sm:w-[30rem] lg:w-[20rem] xl:w-[24rem]' />
                        </div>
                    </div>
                    <Footer /* whatsapp='https://api.whatsapp.com/send/?phone=5491169392978&text&type=phone_number&app_absent=0'  */ instagram='https://www.instagram.com/oasiszarate/' facebook='https://www.facebook.com/oasiszarate' />
                </div>
            )}
        </div>
    )
}
