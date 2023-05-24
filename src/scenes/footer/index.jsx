import {Box, Typography, useMediaQuery} from "@mui/material";

const Footer = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#FFE1E0',
                py: '4rem'
            }}
        >
            <Box
                sx={{
                    mx: 'auto',
                    width: 5/6,
                    gap: '4rem',
                    display: isAboveMediumScreens ? 'flex' : undefined
                }}
            >
                <Box
                    sx={{
                        flexBasis: '50%',
                        mt: isAboveMediumScreens ? '0px' : '4rem'
                    }}
                >
                    {/*TODO: Extract logo into a separate component with hover and navigate*/}
                    <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" >
                        OnlySports
                    </Typography>

                    <Typography
                        sx={{
                            my: '1.25rem'
                        }}
                    >
                        Step into the world of OnlySports, a vibrant community of young athletes, trainers, and sports enthusiasts.
                        Together, we embark on a journey filled with endless possibilities, unforgettable moments,
                        and a deep sense of unity. Here, passion meets purpose, and the love for sports knows no boundaries.
                    </Typography>

                    <Typography>
                        &#169; OnlySports All Rights Reserved.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flexBasis: '25%',
                        mt: isAboveMediumScreens ? '0px' : '4rem'
                    }}
                >
                    <Typography variant="h4" fontWeight="700">
                        Links
                    </Typography>
                    <Typography sx={{ my: '1.25rem' }}>
                        GitHub
                    </Typography>
                    <Typography sx={{ my: '1.25rem' }}>
                        GitHub
                    </Typography>
                    <Typography sx={{ my: '1.25rem' }}>
                        GitHub
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flexBasis: '25%',
                        mt: isAboveMediumScreens ? '0px' : '4rem'
                    }}
                >
                    <Typography variant="h4" fontWeight="700">
                        Contact Us
                    </Typography>
                    <Typography sx={{ my: '1.25rem' }}>
                        Visit us at 456 Active Street, Sportstown, Fitlandia
                    </Typography>
                    <Typography>
                        Give us a ring at <a href="tel:+1234567890">+1234567890</a>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;