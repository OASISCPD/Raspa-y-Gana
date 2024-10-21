import { useRef, useState } from 'react';
import img from '../../assets/imgs/logo_blanco.png';
import imgRaspado from '../../assets/imgs/fondo-raspada.png';
import imgTemplateMail from '../../assets/imgs/fondoFormSinMobile.png'
import fondoRaspaJuegoMobile from '../../assets/imgs/fondoRaspaJuegoMobile.png';
import { ScratchRaspada } from '../Scratch/Scratch';
import { LogicTemplateMail } from '../LogicTemplateMail'
/* import { ModalTemplate } from '../modals/ModalTemplate';
import { Modal } from '../modals/Modal'; */
/* import { useNavigate } from 'react-router-dom'; */

interface propHome {
    goToTemplateMail: () => void
}
export function TemplateScratch({ goToTemplateMail }: propHome) {
    /*  const navigate = useNavigate() */
    //LOGICA DE CARGA DE IMAGENES
    const [showScratch, setShowScratch] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(fondoRaspaJuegoMobile);
    const [isLoading, setLoading] = useState(false);
    //constante q maneja el smoth del componente
    const sectionRef = useRef<HTMLDivElement>(null)
    //modal de filtracion
    /*  const [modal, setModal] = useState<boolean>(false); */

    const handleGetPrizeClick = () => {
        /* setModal(false) */
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
    /*  const checkFirsPlay = () => {
         setModal(true)
     }; */
    console.log(backgroundImage)
    return (
        <div>
            <section

                className="text-gray-600 body-font relative"
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
                            <div className="flex flex-col text-center   py-[5rem] sm:py-4  w-full  font-bold">
                                <img src={img} className="w-[20rem] mx-auto sm:w-[40rem] lg:w-[20rem] xl:w-[26rem]" alt="Titulo Alterno" />
                            </div>
                            <ScratchRaspada fetchPrize={true} imgRaspado={imgRaspado} buttonGetPrize={handleGetPrizeClick} />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}