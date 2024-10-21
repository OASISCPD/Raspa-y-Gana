import { useState, useEffect } from 'react';
import img1 from "../assets/imgs/titulo-2.png";
import img2 from "../assets/imgs/ISO_COLOR.png";
import img3 from "../assets/imgs/cropped-favicon-wp-180x180.webp";
import img4 from "../assets/imgs/fondo-raspadaverde.png";
import { LoadingInit } from '../components/loading/LoadingInit';

export function PageTest() {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, 2000); // 1000 milliseconds = 1 second

        const loadImage = (src: any) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = src;
            });
        };

        Promise.all([loadImage(img1), loadImage(img2), loadImage(img3), loadImage(img4)])
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
                <div>
                    {/*   <img src={img1} alt="" />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                    <img src={img4} alt="" /> */}
                </div>
            )}
        </div>
    );
}
