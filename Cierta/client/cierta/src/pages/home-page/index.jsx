import AboutSection from "../../components/about"
import ContactSection from "../../components/contact"
import ContactSectionV2 from "../../components/contact/contact-v2"
import CentralQuoteForm from "../../components/form"
import PartnersSection from "../../components/partners"
import FullSlider from "../../components/promo"
import ReviewSlider from "../../components/review-slider"
import MobileServicesAccordion from "../../components/services/mobile-about"
import ServiceSection from "../../components/services"

import "../../media/_media1200.scss"
import "../../media/_media992.scss"
import "../../media/_media768.scss"
import "../../media/_media576.scss"


const HomePage = () =>{

   
    return(
        <>
        <FullSlider />
        <CentralQuoteForm/>
        <ServiceSection/> 
        <AboutSection/>
        <PartnersSection/>
        <ReviewSlider/>
        <ContactSection/>
        {/* <ContactSectionV2/> */} 
        </>
    )
}
export default HomePage;
