import {useState} from "react";
import {MenuIcon, CloseIcon} from '@mui/icons-material';
import FlexBetween from "components/FlexBetween";
import {Typography} from "@mui/material";

const NavbarInfo = () => {
    return (
        <nav>
            <FlexBetween
                sx={{position: 'fixed', top: '0px', zIndex: '30', width: '100%', py: '1rem', px: '6%'}}>
                <FlexBetween
                    sx={{width: '100%'}}>
                    <FlexBetween
                        sx={{width: '100%', gap: '4rem'}}>
                        {/*LEFT SIDE*/}
                        <Typography
                            fontWeight="bold"
                            fontSize="clamp(1rem, 2rem, 2.25rem)"
                            color="primary"
                        >
                            OnlySports
                        </Typography>

                        {/*RIGHT SIDE*/}
                        <FlexBetween
                            sx={{width: '100%'}}>
                            <FlexBetween
                                sx={{gap: '2rem', fontSize: 'small'}}>
                                <p>Home</p>
                                <p>Benefits</p>
                                <p>Contact Us</p>
                            </FlexBetween>
                            <FlexBetween
                                sx={{gap: '2rem'}}>
                                <p>Sign In</p>
                                <button>Become a Member</button>
                            </FlexBetween>
                        </FlexBetween>
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>
        </nav>
    );
};

export default NavbarInfo;
