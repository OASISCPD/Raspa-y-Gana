import { useMediaQuery } from 'react-responsive'
import { HomeMobile } from '../components/mobile/HomeMobile';
import { HomeTablet } from '../components/mobile/HomeTablet';
import { HomeDesktop } from '../components/desktop/HomeDesktop';

export function PageHome() {
    const isMobile = useMediaQuery({ maxWidth: 639 }); //hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })// desde sm hasta md
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    return (
        <>
            {isMobile && <HomeMobile />}
            {isTablet && <HomeTablet />}
            {isDesktop && <HomeDesktop />}
        </>
    )
}