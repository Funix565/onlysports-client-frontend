import FlexBetween from "components/FlexBetween";
import {Link, Typography, useMediaQuery} from "@mui/material";
import StyledAnchorLink from "./StyledAnchorLink";
import ActionButton from "components/ActionButton";
import OnlyLogo from "components/OnlyLogo";
import {useNavigate} from "react-router-dom";

const NavbarInfo = ({isTopOfPage, selectedPage, setSelectedPage}) => {
    const navigate = useNavigate();
    const isAboveMediumScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <nav>
            <FlexBetween
                sx={{
                    // TODO: Colors from palette. Check behaviour on scroll
                    position: 'fixed', top: '0px', zIndex: '30', width: '100%', py: '1rem', px: '6%',
                    backgroundColor: isTopOfPage ? '' : '#FFE1E0',
                    filter: isTopOfPage ? '' : 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))'
                }}>
                <FlexBetween
                    sx={{width: '100%'}}>
                    <FlexBetween
                        sx={{width: '100%', gap: '4rem'}}>

                        {/*LEFT SIDE*/}
                        <OnlyLogo
                            onClick={() => navigate("/")}
                        />

                        {/*RIGHT SIDE*/}
                        {isAboveMediumScreens && (
                            <FlexBetween
                                sx={{width: '100%'}}>
                                <FlexBetween
                                    sx={{gap: '2rem', fontSize: 'small'}}>
                                    <StyledAnchorLink
                                        page="Home"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <StyledAnchorLink
                                        page="Benefits"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <StyledAnchorLink
                                        page="Contact Us"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                </FlexBetween>
                                <FlexBetween
                                    sx={{gap: '2rem'}}>
                                    <Link href="/login">Sign In as a User</Link>
                                    <ActionButton>Become a Trainer</ActionButton>
                                </FlexBetween>
                            </FlexBetween>
                        )}
                        {/*No need to hide navbar in hamburger MenuIcon based on mediaQuery. Just hide it and scroll a little bit for every section*/}
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>
        </nav>
    );
};

export default NavbarInfo;
