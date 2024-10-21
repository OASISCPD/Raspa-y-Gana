import { useEffect, useState } from 'react';
/* import imgTemplateMail from '../assets/imgs/fondoFormSinMobile.png'; */
import imgTemplateMailTablet from '../assets/imgs/fondoFormSinTablet.png'
import imgTemplateMail from '../assets/imgs/fondoFormSinTablet.png'

import imgTemplateMailDesktop from '../assets/imgs/fondoFormSinDesktop.png';
import logo from '../assets/imgs/logo_rojo.png'
import { Footer } from '../components/Footer';
import { LoadingInit } from '../components/loading/LoadingInit';
export function PageTermsAndConditions() {
    const [image, setImage] = useState(imgTemplateMail)
    //LOGICA DE CARGA DE IMAGENES
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
    const [minimumTimeElapsed, setMinimunTimeElapsed] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 0 && window.innerWidth < 640) {
                setImage(imgTemplateMailTablet);
            }
            else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
                setImage(imgTemplateMailTablet)
            }
            else {
                setImage(imgTemplateMailDesktop);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial background image
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

        Promise.all([loadImage(image)]).then(() => {
            setImagesLoaded(true)
        })

        return () => clearTimeout(timer)
    })


    return (
        <div>
            {!imagesLoaded || !minimumTimeElapsed ? (
                <LoadingInit />
            ) : (
                <section
                    className="text-gray-600 body-font relative"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajusta el valor alpha según sea necesario
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className="relative textGothamMedium">
                        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                        <div className="relative z-20 mx-[2rem] text-start py-16 sm:py-20 text-white ">
                            {/* Contenido aquí */}
                            <h1 className='text-2xl sm:text-4xl'>BASES Y CONDICIONES</h1>
                            {/*      <h1 className='text-xl sm:text-2xl'>PREMIOS</h1> */}
                            {/*   <h1 className='h-0.5 my-2 bg-red-900'></h1> */}
                            <h1 className='text-xl sm:text-2xl'>RASPÁ Y GANÁ
                            </h1>
                            <ol className='mx-[1rem] sm:mx-[2rem] text-base sm:text-xl'>
                                <li className='my-2'>
                                    1. La presente promoción en adelante “Raspá y Ganá”, es organizada por NEWGAMING SRL o NUEVO CASINO ALBERDI - , CUIT 33-70826151-9, (en adelante, “ORGANIZADOR”), organiza el presente sorteo (conforme se define más adelante), el cual solo tendrá vigencia en la Ciudad de Salta, Provincia de Salta, República Argentina, sujeto a las siguientes bases y condiciones (“LAS BASES”).-
                                </li>
                                <li className='my-2'>
                                    2. La sola participación en la acción promocional implica la total aceptación de las presentes “Bases y Condiciones Particulares”, de los “Términos y Condiciones Generales” y de la “Política de tratamiento de datos personales de New Gaming S.R.L.” incluida en los Términos y Condiciones disponibles en el stand de atención al cliente, lo que implica la aceptación de que las decisiones que tome New Gaming S.R.L tendrá el carácter de definitivas e inapelables, toda vez que no resulten abusivas, ni infundadas y no perjudiquen dolosamente el derecho de los Usuarios.
                                </li>
                                <li className='my-2'>
                                    3. Reserva de Derechos. New Gaming S.R.L se reserva el derecho de cancelar, suspender o modificar las presentes “Bases y Condiciones Particulares” y de tener que establecer o pronunciarse sobre aquellas situaciones no previstas en estas Bases y Condiciones Particulares. La cancelación, suspensión y/o modificación de las presentes Bases y Condiciones no dará derecho a los participantes a reclamo ni indemnización alguna.
                                </li>
                                <li className='my-2'>
                                    4.- La vigencia de la promoción será desde el 08 de Octubre de 2024 a las 10:00 hs hasta el 31 de Octubre de 2024 a las 23:59 hs.

                                </li>
                                <li className='my-2'>
                                    5. Solamente podrán participar de la promoción las personas físicas mayores de 18 años, que haya cumplido con los requisitos* solicitados de acuerdo al sorteo que se realice. No podrán participar aquellas personas que no reúnan dichos requisitos como así tampoco personas jurídicas, empleados de New Gaming S.R.L, directivos del organizador, personal del Instituto Provincial de Loterías y Casinos y grupos de contingentes.
                                </li>
                                <li className='my-2'>
                                    6.  Mecánica de la promoción. El usuario accederá a promos.newgaming.com.ar donde encontrará el juego de “raspà y ganà” con premios disponibles. Todas las jugadas tienen premios. Para poder hacerse beneficiario del premio el usuario debe de manera excluyente ingresar una dirección de correo electrónica válida, donde recibirá el código de su premio. Los premios deberán ser canjeados en el plazo de 4 días desde la generación del correo electrónico con el qr que le ha llegado y el dni del usuario. De lo contrario el beneficio quedará disponible para otro ganador.
                                </li>
                                <li className='my-2'>
                                    Para comenzar a hacer uso de su beneficio, deberá presentar el código recibido personalmente en el stand de Atención al Cliente del Casino, donde se corroborará la validez del código y la identidad de la persona escaneando el DNI.
                                </li>
                                <li className='my-2'>
                                    Promoción válida solo para clientes nuevos. Si el beneficiario registra la participación en alguna edición de raspá y ganá o en el girá y ganá, no podrá hacer efectivo su premio.
                                    Se limitará a un premio por DNI sin excepción.
                                    Los premios no incluyen viáticos ni desplazamiento hasta el establecimiento.
                                </li>
                                <li className='my-2 font-semibold'>
                                    JUGAR COMPULSIVAMENTE ES PERJUDICIAL PARA LA SALUD
                                </li>
                            </ol>
                            {/*  <h1 className='h-0.5 bg-red-900 '></h1> */}
                            <h1 className='text-xl sm:text-2xl py-2'>PREMIOS</h1>
                            <ol className='mx-[1rem] sm:mx-[2rem] text-base sm:text-xl'>
                                <li className='my-2'>
                                    <span className='font-bold'>1.1 TICKET DE $20.000 </span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.

                                </li>
                                <li className='my-2'>
                                    <span className='font-bold'>2. 1 TICKET DE $15.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                </li>
                                <li className='my-2'>
                                    <span className='font-bold'>3. 1 TICKET DE $10.000:</span> Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.

                                </li>
                                <li className='my-2'>
                                    <span className='font-bold'>4. 1 TICKET DE $5.000:</span>Se limitará el canje a 1 ticket válido por el día del canje. No transferible.  Ticket jugable no cobrable, disponible en las máquinas slots habilitadas para tal fin.
                                </li>
                                <li className='my-2'>
                                    <span className='font-bold'>5. 15 CUPONES PARA EL SORTEO DEL VIAJE A CARLOS PAZ: </span> No transferible.

                                </li>
                                <li className='my-2'>
                                    <span className='font-bold'>6. 15 CUPONES PARA EL SORTEO DE LA MOTO: </span> No transferible.

                                </li>
                            </ol>
                            <div className='my-8 flex justify-center'>
                                <img src={logo} className='w-[8rem] sm:w-[12rem] animate-spin-once-logo ' alt="" />
                            </div>
                        </div>
                    </div>
                    <Footer whatsapp='https://api.whatsapp.com/send/?phone=543873088660&text&type=phone_number&app_absent=0' instagram='https://www.instagram.com/nuevocasinoalberdi/' facebook='https://www.facebook.com/nuevocasinoalberdi' />
                </section>
            )
            }
        </div>
    );

}

export default PageTermsAndConditions;
