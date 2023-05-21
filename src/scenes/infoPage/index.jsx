import {Box, useTheme} from "@mui/material";
import NavbarInfo from "scenes/navbar/navbarinfo";
import {useEffect, useState} from "react";
import {SelectedPage} from "state/enums";
import HeroInfo from "scenes/hero";
import BenefitsInfo from "scenes/benefits";

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
        // TODO: replace div with Box and set theme color
        // IDK but color doesn't work globally for the whole page.
        // If it works, then it can't be changed in nested components for section only
        <div>
            <NavbarInfo
                isTopOfPage={isTopOfPage}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
                <HeroInfo setSelectedPage={setSelectedPage}/>
                <BenefitsInfo setSelectedPage={setSelectedPage} />
                {/*<ContactInfo />*/}
                {/*<Footer />*/}
        </div>
    );
};

export default InfoPage;
