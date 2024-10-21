import { useEffect, useState } from 'react';
import imgTemplateMail from '../assets/imgs/fondoFormSinTablet.png';
import logo from '../assets/imgs/logo-oasiszarate-grande.png';
import { Footer } from '../components/Footer';
import { LoadingInit } from '../components/loading/LoadingInit';

export function PageHowToGet() {
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
                            <h1 className='text-2xl sm:text-3xl text-center'>ACERCATE CON TU DNI AL STAND DE ATC Y CANJEÁ TU PREMIO</h1>
                       {/*      <div className='h-0.5 my-2 bg-red-900'></div> */}
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => window.open('https://maps.app.goo.gl/WKoYAw4BqiAfvarg6')} className='text-white shadow-lg uppercase mt-8 bg-gradient-to-r from-greenDark to-greenMain border-0 py-2 mx-[4rem]  hover:bg-yellow-600 rounded-3xl items-center text-lg px-8 sm:px-12 sm:text-2xl'>
                                Cómo llegar
                            </button>
                        </div>
                        <div className='flex justify-center items-center content-center mt-48 lg:mt-[8rem]'>
                            <img src={logo} alt="Logo Zarate" className='w-[20rem] sm:w-[30rem] lg:w-[20rem] xl:w-[30rem]' />
                        </div>
                    </div>
                    <Footer /* whatsapp='https://api.whatsapp.com/send/?phone=5491169392978&text&type=phone_number&app_absent=0' */ instagram='https://www.instagram.com/oasiszarate/' facebook='https://www.facebook.com/oasiszarate' />
                </div>
            )}
        </div>
    )
}
