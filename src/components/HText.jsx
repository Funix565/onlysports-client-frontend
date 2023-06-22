import {Typography, useTheme} from "@mui/material";

const HText = ({children}) => {
    const theme = useTheme();

    return (
        <Typography
            variant="h1"
            // TODO: Smth orange in theme
            color={theme.palette.primary.main}
            sx={{
                textTransform: 'uppercase',
                flexBasis: '60%',
                fontWeight: '700'
            }}
        >
            {children}
        </Typography>
    );
};

export default HText;