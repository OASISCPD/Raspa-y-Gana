import { useEffect, useRef, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import logo from '../../assets/imgs/logo_rojo.png'
import { dtoModal, ModalError } from "../modals/ModalError";
import { Modal } from "../modals/Modal";
import { useNavigate } from "react-router-dom";
import { ModalOk } from "../modals/ModalOk";
import { BaseUrl } from "../../logic/BaseUrl";
import '../../styles/slide.css'
import { Carrousel } from "../imgsStyles/ImgCarrousel";

type dtoDataEmail = {
    nombre_apellido: string
    celular: string
    email: string
}

interface modalValues {
    boolean: boolean
    number: number
}
export function TemplateMailMobile() {
    //craendo navigate para navegar
    const navigate = useNavigate()
    //logic modals
    const [modal, setModal] = useState<modalValues | null>(null)
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    const [email, setEmail] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [buttonActivated, setButtonActivated] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false); // Estado para controlar la carga

    const firstDivRegex = useRef<HTMLDivElement>(null)

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para manejar el cambio en el campo de correo electrónico
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setButtonActivated(emailRegex.test(value) && isChecked); // Activar botón si el correo es válido y el checkbox está marcado
    };

    // Función para manejar el cambio en el checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        setButtonActivated(emailRegex.test(email) && event.target.checked); // Activar botón si el correo es válido y el checkbox está marcado
    };
    //envio de data
    async function sendData() {
        setLoading(true)
        const data: dtoDataEmail = {
            nombre_apellido: email.split("@")[0],
            celular: "",
            email: email
        };

        const urlencoded = new URLSearchParams();
        urlencoded.append('nombre_apellido', data.nombre_apellido)
        urlencoded.append('celular', data.celular)
        urlencoded.append('email', data.email)

        //creamos la request
        const requestOptions = {
            method: "POST",
            body: urlencoded,
            credentials: 'include' as RequestCredentials,
            mode: "cors" as RequestMode,
            redirect: 'follow' as RequestRedirect
        }
        try {
            const response = await fetch(`${BaseUrl}/insertar_accion`, requestOptions)
            const data = await response.json()
            /* const data = 200 */
            switch (data.status_code) {
                case 200:
                    setModal({ boolean: true, number: 200 })
                    setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá  tu casilla de mail y busca Promociones Oasis Zarate.' })
                    // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o hacer alguna acción adicional

                    break;
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: 'Debes jugar para poder recibir el premio', subTitle: 'Se refrescara la pagina y volvera al inicio para poder jugar' })
                    break;
                case 405:
                    setModal({ boolean: true, number: 405 })
                    setDataModal({ title: "Ocurrio un error en el campo requerido(mail)", subTitle: 'Intentelo nuevamente' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: "El formato del correo electronico es invalido", subTitle: "Verifique que su correo electronico este bien escrito" })
                    break;
                case 402:
                    setModal({ boolean: true, number: 402 })
                    setDataModal({ title: '¡Ups! Parece que ya participaste de una edición anterior', subTitle: 'Esta promo es solo para personas que no hayan participado antes' })
                    break;
                case 401:
                    setModal({ boolean: true, number: 401 })
                    setDataModal({ title: 'Por alguna razon el formulario ya ha sido enviado', subTitle: 'Se lo redirigira a otra section' })
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: 'Error al enviar el correo', subTitle: 'Intente nuevamente ' })
        } finally {
            setLoading(false); // Desactiva el estado de carga después de recibir la respuesta
        }

    }
    useEffect(() => {
        setLoading(true); // Activar el estado de carga
        setTimeout(() => {
            setLoading(false);
            firstDivRegex.current?.scrollIntoView({ behavior: "smooth" }) // Desactiva el estado de carga cuando termina la operación
        }, 500);
    }, [])

    useEffect(() => {
        if (firstDivRegex.current) {
            firstDivRegex.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    return (
        <div className=" sm:mx-[2rem]  py-[6rem] textGothamMedium">
            {isLoading && ( // Muestra el spinner de carga si isLoading es true
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                    </div>
                </div>
            )}
            <h1 ref={firstDivRegex} className="text-2xl  text-white text-center sm:text-4xl">INGRESÁ UNA DIRECCIÓN DE CORREO VÁLIDA <br />
                PARA QUE TE ENVIEMOS UN MAIL CON TU PREMIO</h1>
            <h2 className="text-gray-200 mb-8 mt-4 sm:my-20  text-sm sm:text-2xl">
                Recuerda ingresar tu mail correctamente
                y checkea casilla de SPAM si no lo ves en bandeja de ENTRADA
            </h2>
            <div className="relative flex my-12 items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdOutlineMailOutline size={24} className="text-gray-700" />
                </span>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="pl-[3rem] pr-4 py-4 border-gray-300 text-black text-xl  placeholder-gray-500 h-full w-full border rounded-full focus:outline-none focus:border-indigo-500"
                    placeholder="M A I L"
                />
            </div>
            <div className="flex items-center mb-4 sm:mb-12">
                <input
                    onChange={handleCheckboxChange}
                    id="default-checkbox"
                    type="checkbox"
                    checked={isChecked}
                    className="w-4 h-4 sm:w-8 sm:h-8  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label onClick={() => window.open('/terms')} className="ms-2 text-sm  text-blue-600  underline sm:text-xl">Acepto términos y condiciones</label>
            </div>

            <button
                onClick={sendData}
                disabled={!buttonActivated}
                className={`${buttonActivated ? 'bg-gradient-to-r from-greenDark to-greenMain' : 'bg-green-700 bg-opacity-70 text-opacity-50 '} uppercase rounded-3xl p-2 px-[3rem] cursor-pointer  text-white sm:text-xl`}
            >
                Enviar
            </button>
            <div className="pt-[4rem]">
                <Carrousel />
            </div>
            <div className="mt-4 flex justify-center">
                <img src={logo} className="w-[24rem] sm:w-[24rem]" alt="logo empresarial" />
            </div>
            {modal?.boolean && modal?.number === 401 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalError buttonText="Continuar" onClose={() => navigate('/howToGet')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 403 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText="Jugar" onClose={() => window.location.reload()} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 402 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 402 })}>
                    <ModalError buttonText="Cerrar" onClose={() => navigate('/alreadyPlayed')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 404 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 404 })}>
                    <ModalError buttonText="Volver" onClose={() => setModal({ boolean: false, number: 404 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 405 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 405 })}>
                    <ModalError buttonText="Volver" onClose={() => setModal({ boolean: false, number: 405 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 200 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 200 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 200 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 500 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError buttonText="Volver" onClose={() => { setModal({ boolean: false, number: 500 }) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
        </div>
    )
}

