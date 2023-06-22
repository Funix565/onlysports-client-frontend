import {Box} from "@mui/material";
import NavbarInfo from "scenes/navbar/navbarinfo";
import {useEffect, useState} from "react";
import {SelectedPage} from "state/enums";
import HeroInfo from "scenes/hero";
import BenefitsInfo from "scenes/benefits";
import ContactInfo from "scenes/contact";
import Footer from "scenes/footer";

const InfoPage = () => {
    const [selectedPage, setSelectedPage] = useState(SelectedPage.Home);
    const [isTopOfPage, setIsTopOfPage] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
                setSelectedPage(SelectedPage.Home)
            }
            if (window.scrollY !== 0) {
                setIsTopOfPage(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // TODO: Remove box and use Fragment <></>
        // Or create workaround for this Box. On zoom- the main page should take up the entire page
        <Box>
            <NavbarInfo
                isTopOfPage={isTopOfPage}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
                <HeroInfo setSelectedPage={setSelectedPage}/>
                <BenefitsInfo setSelectedPage={setSelectedPage} />
                <ContactInfo setSelectedPage={setSelectedPage} />
                <Footer />
        </Box>
    );
};

export default InfoPage;
