import { useMediaQuery } from 'react-responsive'
import { TemplateMailMobile } from './mobile/TemplateMailMobile'
import { TemplateMailDesktop } from './desktop/TemplateMailDesktop'
export function LogicTemplateMail() {
    const isMobile = useMediaQuery({ maxWidth: 639 }); //hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })// desde sm hasta md
    const isDesktop = useMediaQuery({ minWidth: 1024 })

    return (
        <>
            {isMobile && <TemplateMailMobile />}
            {isTablet && <TemplateMailMobile />}
            {isDesktop && < TemplateMailDesktop />}
        </>
    )
}