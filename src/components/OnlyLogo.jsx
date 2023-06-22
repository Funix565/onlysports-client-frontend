import {Typography, useTheme} from "@mui/material";

const OnlyLogo = ({ onClick }) => {
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;

    return (
        <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={onClick}
            sx={{
                "&:hover": {
                    color: primaryLight,
                    cursor: "pointer"
                }
            }}
        >
            OnlySports
        </Typography>
    );
};

export default OnlyLogo;
