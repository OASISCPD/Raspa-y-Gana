import { useEffect, useState } from 'react'
import { MdCheckCircleOutline } from "react-icons/md";


interface Props {
    onClose: () => void
    /*   deleteUser: () => void */
    title: string | undefined
    subTitle: string | undefined
    email: string | undefined
}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalOk({ onClose, title, subTitle, email }: Props) {
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-4 flex items-center justify-center h-screen text-white textGothamMedium">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="bg-white rounded-2xl p-8 w-[20rem] sm:w-[30rem] py-8  shadow-2xl transform transition-all duration-300 ">
                        <div className='flex justify-center items-center'>
                            <MdCheckCircleOutline size={60} className='text-greenMain' />
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-lg text-center text-backgroundCyanDark text-gray-700 ml-auto mr-auto uppercase  sm:text-xl">{title}</h2>
                        </div>
                        <div className="flex flex-col justify-between items-center py-1">
                            <h2 className="text-sm text-center text-gray-800 ml-auto mr-auto uppercase  sm:text-base">{subTitle}</h2>
                            <h6 className='text-sm text-center text-redMain ml-auto mr-auto uppercase my-2 sm:text-base'>Si aún no lo viste en la bandeja de entrada del mail: <span className="text-blueMain"> {email} </span><br />revisá la casilla de spam</h6>
                        </div>
                        <div className='grid grid-cols-1 my-4 items-center'>
                            <button onClick={onClose} className='px-4 mx-auto py-1 rounded-xl min-w-[6rem] bg-gradient-to-r from-redMain to-roseMain duration-300 sm:text-lg'>Cerrar</button>
                            {/*   <button onClick={value} className='px-4  mx-auto py-1 rounded-md bg-colorRed hover:bg-red-600 duration-300'>Si!, Eliminar</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
