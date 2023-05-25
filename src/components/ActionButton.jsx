import {Link} from "@mui/material";

const ActionButton = ({children}) => {
    return (
        // TODO: Replace hardcoded colors with useTheme -> palette
        // TODO: onClick -- navigate to Creat Account: Coach or Athlete
        // TODO: onClick different login for roles
        <Link
            underline="hover"
            sx={{
                borderRadius: "0.375rem",
                backgroundColor: "#FFC132",
                px: "2.5rem",
                py: "0.5rem",
                "&:hover": {
                    backgroundColor: "#FF6B66",
                    color: "#FFFFFF"
                }
            }}
        >
            {children}
        </Link>
    );
};

export default ActionButton;
