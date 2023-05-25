import {Box, useTheme} from "@mui/material";
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
