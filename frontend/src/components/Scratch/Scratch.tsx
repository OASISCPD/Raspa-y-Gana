import React, { useEffect, useRef, useState } from 'react';
/* import imgRaspado from '../../assets/imgs/fondo-raspada.jpg'; */
import confetti from 'canvas-confetti';
import { fetchMailEnviado, Prize } from '../../logic/getPrize';
import { Modal } from '../modals/Modal';
import { ModalOk } from '../modals/ModalOk';
import { dtoModal, ModalError } from '../modals/ModalError';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../logic/BaseUrl';
interface ScratchRaspadaProps {
    imgRaspado: string;
    buttonGetPrize: () => void
    fetchPrize: boolean;
}

interface modalValues {
    boolean: boolean
    number: number
}

export const ScratchRaspada: React.FC<ScratchRaspadaProps> = ({ imgRaspado, buttonGetPrize, fetchPrize }) => {

    // loading
    const [loading, setLoading] = useState<boolean>(false)
    //navigate
    const navigate = useNavigate()
    const [email, setEmail] = useState<string | undefined>()
    const [modal, setModal] = useState<modalValues | null>(null)
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    const [prize, setPrize] = useState<string | null>(null)
    //constante del scratch
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scratchCardCoverRef = useRef<HTMLDivElement | null>(null);
    const scratchCardCanvasRenderRef = useRef<HTMLImageElement | null>(null);
    const scratchCardCoverContainerRef = useRef<HTMLDivElement | null>(null);
    const scratchCardTextRef = useRef<HTMLParagraphElement | null>(null);
    const scratchCardTextRefApiPrize = useRef<HTMLParagraphElement | null>(null);
    const scratchCardImageRef = useRef<HTMLImageElement | null>(null);
    const getPrizeButtonRef = useRef<HTMLButtonElement | null>(null);
    //print de un texto
    const [printText, setPrintText] = useState<boolean>(true)
    //logica del premio a obtener
    async function getDataPrize() {
        setLoading(true)
        try {
            /*   const data = await getPrize('2902df0ce2'); */
            const response = await fetch(`${BaseUrl}/obtener_premio?codigo_campana=3d69545983`, {
                credentials: 'include' as RequestCredentials,
                mode: "cors" as RequestMode,
                redirect: 'follow' as RequestRedirect
            });
            const data: Prize = await response.json();
            switch (data.status_code) {
                case 401:
                    const email = await fetchMailEnviado();
                    if (email) {
                        setEmail(email)
                        setModal({ boolean: true, number: 401 })
                        setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá  tu casilla de mail y busca Promociones Oasis Pilar.' })
                    }
                    break
                case 402:
                    setPrize(data.premio)
                    break
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 200:
                    setPrize(data.premio)
                    break
                default:
                    console.error('Error desconocido')
                    setModal({ boolean: true, number: 500 })
                    setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
            console.error(error)
            /*   window.location.reload() */
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fetchPrize) {
            getDataPrize()
        }
    }, [fetchPrize])

    //logica de scrach
    useEffect(() => {
        const isSafari = false;
        const scratchCardCover = scratchCardCoverRef.current;
        const scratchCardCanvasRender = scratchCardCanvasRenderRef.current;
        const scratchCardCoverContainer = scratchCardCoverContainerRef.current;
        const scratchCardText = scratchCardTextRef.current;
        const scratchCardImage = scratchCardImageRef.current;
        const textScratchPrize: any = scratchCardTextRefApiPrize.current;
        const getPrizeButton = getPrizeButtonRef.current;

        const canvas = canvasRef.current;
        if (!canvas || !scratchCardCover || !scratchCardCanvasRender || !scratchCardCoverContainer || !scratchCardText || !scratchCardImage || !getPrizeButton || !textScratchPrize) {
            console.error('One or more refs are null');
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        /*  let isPointerDown = false; */
        let positionX: number | null = null;
        let positionY: number | null = null;
        let clearDetectionTimeout: number | undefined = undefined;

        const devicePixelRatio = window.devicePixelRatio || 1;
        const canvasWidth = canvas.offsetWidth * devicePixelRatio;
        const canvasHeight = canvas.offsetHeight * devicePixelRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.scale(devicePixelRatio, devicePixelRatio);

        if (isSafari) {
            canvas.classList.add('hidden');
        }

        const getPosition = ({ clientX, clientY }: MouseEvent) => {
            const { left, top } = canvas.getBoundingClientRect();
            return {
                x: clientX - left,
                y: clientY - top,
            };
        };

        const plotline = (context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
            const diffX = Math.abs(x2 - x1);
            const diffY = Math.abs(y2 - y1);
            const dist = Math.sqrt(diffX * diffX + diffY * diffY);
            const step = dist / 50;
            let i = 0;
            let t: number;
            let x: number;
            let y: number;

            while (i < dist) {
                t = Math.min(1, i / dist);
                x = x1 + (x2 - x1) * t;
                y = y1 + (y2 - y1) * t;

                context.beginPath();
                context.arc(x, y, 16, 0, Math.PI * 2);
                context.fill();

                i += step;
            }
        };

        const setImageFromCanvas = () => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const previousUrl = scratchCardCanvasRender.src;
                    scratchCardCanvasRender.src = url;
                    if (!previousUrl) {
                        scratchCardCanvasRender.classList.remove('hidden');
                    } else {
                        URL.revokeObjectURL(previousUrl);
                    }
                }
            });
        };

        const checkBlackFillPercentage = async () => {
            const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
            const pixelData = imageData.data;
            let blackPixelCount = 0;
            for (let i = 0; i < pixelData.length; i += 4) {
                const red = pixelData[i];
                const green = pixelData[i + 1];
                const blue = pixelData[i + 2];
                const alpha = pixelData[i + 3];

                if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
                    blackPixelCount++;
                }
            }
            const blackFillPercentage = (blackPixelCount * 100) / (canvasWidth * canvasHeight);

            if (blackFillPercentage >= 30) {
                getPrizeButton.style.display = 'block';
                scratchCardCoverContainer.classList.add('clear');
                scratchCardText.textContent = '¡Tenés un premio de Oasis Pilar!';
                /*    scratchCardTextRefApiPrize.current.textContent = prize; */
                getPrizeButton.disabled = false;
                /*  const footer = document.getElementById('footer');
                 footer?.scrollIntoView({ behavior: 'smooth' }); */
                // Scroll suave hacia el botón
                setPrintText(false)
                getPrizeButton.scrollIntoView({ behavior: 'smooth' });
                scratchCardImage.classList.add('animate');
                scratchCardCoverContainer.classList.add('bg-red-500');
                scratchCardCoverContainer.addEventListener(
                    'transitionend',
                    () => {
                        scratchCardCoverContainer.classList.add('hidden');
                    },
                    { once: true }
                );
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };

        const plot = (e: MouseEvent) => {
            const { x, y } = getPosition(e);
            if (positionX !== null && positionY !== null) {
                plotline(context, positionX, positionY, x, y);
            }
            positionX = x;
            positionY = y;
            if (isSafari) {
                clearTimeout(clearDetectionTimeout);
                clearDetectionTimeout = window.setTimeout(() => {
                    setImageFromCanvas();
                }, 5);
            }
        };

        canvas.addEventListener('pointerdown', (e) => {
            scratchCardCover.classList.remove('shine');
            const pos = getPosition(e);
            positionX = pos.x;
            positionY = pos.y;
            clearTimeout(clearDetectionTimeout);
            canvas.addEventListener('pointermove', plot);
            window.addEventListener(
                'pointerup',
                () => {
                    canvas.removeEventListener('pointermove', plot);
                    clearDetectionTimeout = window.setTimeout(() => {
                        checkBlackFillPercentage();
                    }, 500);
                },
                { once: true }
            );
        });
    }, []);

    return (
        <div>
            {loading && ( // Muestra el spinner de carga si isLoading es true
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                    </div>
                </div>
            )}
            {/*  <p className=' mx-auto text-white leading-relaxed  text-center text-xl sm:text-2xl lg:text-base xl:text-lg '>RASPÁ EL LOGO Y DESCUBRÍ TU PREMIO.</p> */}
            <div className="grid grid-cols-1 py-[6rem]  2xl:py-[10rem] items-center">
                <div className='flex justify-center  sm:my-8 lg:my-0'>
                    <div className="scratch-card ">
                        <div className="scratch-card-cover-container shadow-2xl " ref={scratchCardCoverContainerRef}>
                            <canvas ref={canvasRef} className="scratch-card-canvas" width="320" height="320"></canvas>
                            <img ref={scratchCardCanvasRenderRef} className="scratch-card-canvas-render hidden" alt="" />
                            <div className="scratch-card-cover shine" ref={scratchCardCoverRef}>
                                <svg className="scratch-card-cover-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
                                    <image className='w-[20rem]' href={imgRaspado} />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-pink-500 bg-opacity-10 text-white text-center flex flex-col justify-center items-center rounded-2xl h-full">
                            <h1 className='text-4xl lg:text-3xl uppercase'>¡Ganaste!</h1>
                            <p ref={scratchCardTextRefApiPrize} className="mt-8 text-2xl lg:text-xl ">
                                {prize ? prize : 'Sigue Raspando...'}
                            </p>
                        </div>
                    </div>
                </div>
                {printText && (
                    <p className="scratch-card-text text-white  text-center text-lg my-2 sm:my-8 sm:text-2xl lg:text-xl ">¡DESCUBRÍ TU PREMIO!</p>
                )}
                <p className="scratch-card-text text-white  text-center text-lg my-2 sm:my-8 sm:text-2xl lg:text-xl " ref={scratchCardTextRef}></p>
                <svg width="0" height="0">
                    <filter id="remove-black" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 1" result="black-pixels"></feColorMatrix>
                        <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                    </filter>
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </svg>
                <img ref={scratchCardImageRef} id="raspado_completo" className="hidden" src={imgRaspado} alt="Raspado Completo" />
                <div>
                </div>
                <button
                    ref={getPrizeButtonRef}
                    type='button'
                    onClick={buttonGetPrize}
                    className="text-white shadow-2xl shadow-gray-500 uppercase my-8 bg-gradient-to-r from-redMain to-roseMain   hover:scale-95 duration-300 border-0 py-2 mx-auto w-[80%] sm:w-[60%] lg:w-[30%] max-w-sm  rounded-3xl items-center text-lg sm:text-xl lg:text-base hidden"
                >
                    ¡Quiero mi Premio!
                </button>

            </div>
            {/* MODALS */}
            {modal?.boolean && modal.number === 401 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalOk email={email} onClose={() => { setModal({ boolean: false, number: 401 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 403 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 404 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 500 && (
                <Modal isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 500 }), navigate('/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
        </div>
    )
}
