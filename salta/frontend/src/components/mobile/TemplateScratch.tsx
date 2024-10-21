import { useRef, useState } from 'react';
import imgRaspado from '../../assets/imgs/fondo-raspada.jpg';
//imagen del raspado
import img from '../../assets/imgs/logo_rojo.png'
import imgTemplateMail from '../../assets/imgs/fondoFormSinMobile.png'
import fondoRaspaJuegoMobile from '../../assets/imgs/fondoRaspaJuegoMobile.png';
import { ScratchRaspada } from '../Scratch/Scratch';
import { LogicTemplateMail } from '../LogicTemplateMail'

interface propHome {
    goToTemplateMail: () => void
}
export function TemplateScratch({ goToTemplateMail }: propHome) {
    /* const navigate = useNavigate() */
    //LOGICA DE CARGA DE IMAGENES

    const [showScratch, setShowScratch] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoMobile);
    const [isLoading, setLoading] = useState(false);
    //constante q maneja el smoth del componente
    const sectionRef = useRef<HTMLDivElement>(null)

    const handleGetPrizeClick = () => {
        goToTemplateMail()
        setLoading(true);
        setTimeout(() => {
            setShowScratch(true);
            setBackgroundImage(imgTemplateMail);
            setLoading(false);
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            // Scroll suave hacia la sección
        }, 500);
    };

    console.log(backgroundImage)
    return (
        <div>
            <section

                className="text-gray-600 body-font relative py-[1rem] lg:py-[5rem] xl:py-[5rem] 2xl:py-[4rem]"
            >
                {isLoading && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                        <div className="flex justify-center items-center h-screen">
                            <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                        </div>
                    </div>
                )}
                <div className="px-5 mx-auto textGothamMedium">
                    {showScratch ? (
                        <div ref={sectionRef} >
                            <LogicTemplateMail />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col text-center  w-full  font-bold">
                                <img src={img} className="w-[8rem] mx-auto sm:w-[12rem] lg:w-[12rem] xl:w-[12rem]" alt="Titulo Alterno" />
                            </div>
                            <ScratchRaspada fetchPrize={true} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick} />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
