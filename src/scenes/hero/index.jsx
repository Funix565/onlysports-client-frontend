import ActionButton from "components/ActionButton";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {SelectedPage} from "../../state/enums";
import AnchorLink from "react-anchor-link-smooth-scroll";
import {motion} from "framer-motion";

const HeroInfo = ({setSelectedPage}) => {
    const isAboveMediumScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box
            component="section"
            id="home"
            sx={{
                gap: '4rem',
                // TODO: confusions with colors
                backgroundColor: '#F8F4EB',
                py: '2.5rem',
                height: isAboveMediumScreens ? '100%' : undefined,
                pb: isAboveMediumScreens ? '0' : undefined
            }}>
            {/*Image and main header*/}
            <Box
                component={motion.div}
                onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
                sx={{
                    mx: 'auto',
                    width: 5/6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: isAboveMediumScreens ? 'flex' : undefined,
                    height: isAboveMediumScreens ? 5/6 : undefined
                }}
            >
                {/*main header*/}
                <Box
                    sx={{
                        zIndex: '10',
                        mt: isAboveMediumScreens ? '15rem' : '8rem',
                        flexBasis: isAboveMediumScreens ? '60%' : undefined
                    }}
                >
                    {/*headings*/}
                    <Box
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount:0.5}}
                        transition={{duration: 0.5}}
                        variants={{
                            hidden: { opacity: 0, x:-50},
                            visible: { opacity: 1, x: 0}
                        }}
                        sx={{
                            mt: isAboveMediumScreens ? '-5rem' : undefined
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <Box
                                sx={{
                                    "&::before": {
                                        position: 'absolute',
                                        top: '-5rem',
                                        left: '-5rem',
                                        zIndex: '-1',
                                        content: isAboveMediumScreens ? 'url(../assets/DevelopText.png)' : undefined
                                    }
                                }}
                            >
                                <img alt="home-page-text" src="../assets/HomeText.png"/>
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                mt: '2rem',
                                fontSize: 'small'
                            }}
                        >
                            Join a thriving community of like-minded individuals who eat, sleep,
                            and breathe sports. Whether you're a professional athlete, a weekend warrior, or just a
                            dedicated fan, OnlySports has everything you need to connect, compete, and celebrate the
                            sports you adore. Share your athletic journey, engage in lively discussions, discover new
                            training tips, and cheer on your favorite teams together.
                        </Typography>
                    </Box>

                    {/*ACTIONS*/}
                    <Box
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount:0.5}}
                        transition={{delay : 0.2, duration: 0.5}}
                        variants={{
                            hidden: { opacity: 0, x:-50},
                            visible: { opacity: 1, x: 0}
                        }}
                        sx={{
                            mt: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem'
                        }}
                    >
                        <ActionButton>
                            Join Now
                        </ActionButton>
                        {/*    // TODO: Two buttons for Athlete and Trainer*/}

                        {/*Ok, no cool hover effects and link styling. Leave it plain, apply styles via `style` prop*/}
                        <AnchorLink
                            style={{
                                fontSize: 'small',
                                fontWeight: '700',
                                color: '#FF6B66'
                            }}
                            onClick={() => setSelectedPage(SelectedPage.ContactUs)}
                            href={`#${SelectedPage.ContactUs}`}
                        >
                            <p>Learn More</p>
                        </AnchorLink>
                    </Box>
                </Box>
                {/*image*/}
                <Box
                    sx={{
                        // TODO: Perhaps all this flex stuff could be wrapped in our FlexBetween, override properties if specified
                        display: 'flex',
                        flexBasis: '60%',
                        justifyContent: 'center',
                        ...(isAboveMediumScreens && {
                            zIndex: '10',
                            ml: '10rem',
                            mt: '4rem',
                            justifyItems: 'end'
                        })
                }}>
                    <img alt="home-pageGraphic" src="../assets/HomePageGraphic.png" />
                </Box>
            </Box>

            {/*sponsors*/}
            {isAboveMediumScreens && (
                <Box
                    sx={{
                        height: '150px',
                        width: '100%',
                        // TODO: Colors from useTheme -> palette
                        backgroundColor: '#FFE1E0',
                        py: '2.5rem'
                    }}
                >
                    <Box
                        sx={{
                            mx: 'auto',
                            width: 5/6
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                // TODO: Use our FlexBetween
                                justifyContent: 'space-between',
                                gap: '2rem'
                            }}
                        >
                            <img alt="redbull-sponsor" src="../assets/SponsorRedBull.png" />
                            <img alt="forbes-sponsor" src="../assets/SponsorForbes.png" />
                            <img alt="fortune-sponsor" src="../assets/SponsorFortune.png" />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default HeroInfo;
