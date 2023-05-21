import {Box, Link, Typography} from "@mui/material";
import AnchorLink from "react-anchor-link-smooth-scroll";
import {SelectedPage} from "../../state/enums";
import {motion} from "framer-motion";

const childVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

const Benefit = ({icon, title, description, setSelectedPage}) => {
    return (
        <Box
            component={motion.div}
            variants={childVariant}
            sx={{
                // flex: '1' -- fixed benefit-card size. Now they have equal width and height regardless of content
                flex: '1',
                mt: '1.25rem',
                borderRadius: '0.375rem',
                borderWidth: '2px',
                borderColor: '#DFCCCC',
                px: '1.25rem',
                py: '4rem',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    mb: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        borderRadius: '9999px',
                        borderWidth: '2px',
                        borderColor: '#DFCCCC',
                        backgroundColor: '#FFE1E0',
                        p: '1rem'
                    }}
                >
                    {icon}
                </Box>
            </Box>

            <Typography variant="h6" fontWeight="700">
                {title}
            </Typography>
            <Typography
                sx={{
                    my: '0.75rem'
                }}
            >
                {description}
            </Typography>
            <Link
                underline="always"
                sx={{
                    fontSize: 'small',
                    fontWeight: '700',
                    color: '#FF6B66',
                    "&:hover": {
                        color: '#FFC132'
                    }
                }}
            >
                <AnchorLink
                    onClick={() => setSelectedPage(SelectedPage.ContactUs)}
                    href={`#${SelectedPage.ContactUs}`}
                >
                    <p>Learn More</p>
                </AnchorLink>
            </Link>
        </Box>
    );
};

export default Benefit;