import '../../styles/loadingInit.css'
import img from '../../assets/imgs/logo-oasiszarate-grande.png'
import { useEffect, useState } from 'react';
export function LoadingInit() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-1000 overflow-y-hidden z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} className='w-[20rem] sm:w-[24rem] flex justify-center items-center content-center mx-auto mt-[16rem] sm:mt-[24rem] lg:mt-[8rem] xl:mt-[14rem] 2xl:mt-[20rem]' />
            <div className="scene">
                <svg
                    version="1.1"
                    id="dc-spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px"
                    width="38px"
                    height="38px"
                    viewBox="0 0 38 38"
                    preserveAspectRatio="xMinYMin meet"
                >
                    <text x="8.5" y="21" fontSize="3px" style={{ letterSpacing: '0.6' }} className='uppercase font-black textGothamMedium' fill="white">Cargando
                        <animate
                            attributeName="opacity"
                            values="0;1;0" dur="1.8s"
                            repeatCount="indefinite" />
                    </text>
                    <path fill="#373a42" d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203
    C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20
    C34.797,11.841,28.159,5.203,20,5.203z">
                    </path>

                    <path fill="#373a42" d="M20,33.125c-7.237,0-13.125-5.888-13.125-13.125S12.763,6.875,20,6.875S33.125,12.763,33.125,20
    S27.237,33.125,20,33.125z M20,7.078C12.875,7.078,7.078,12.875,7.078,20c0,7.125,5.797,12.922,12.922,12.922
    S32.922,27.125,32.922,20C32.922,12.875,27.125,7.078,20,7.078z">
                    </path>

                    <path fill="#2AA198" stroke="#d00000" strokeWidth="0.9" strokeMiterlimit="10" d="M5.203,20
			c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 20 20"
                            to="360 20 20"
                            calcMode="spline"
                            keySplines="0.4, 0, 0.2, 1"
                            keyTimes="0;1"
                            dur="2s"
                            repeatCount="indefinite" />
                    </path>
                    e85d04
                    <path fill="#85990" stroke="#e85d04" strokeWidth="0.7" strokeMiterlimit="10" d="M7.078,20
  c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203
  C12.875,32.922,7.078,27.125,7.078,20z">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 20 20"
                            to="360 20 20"
                            dur="1.8s"
                            repeatCount="indefinite" />
                    </path>
                </svg>
            </div >
        </div>

    );
}