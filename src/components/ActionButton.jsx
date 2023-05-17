import AnchorLink from "react-anchor-link-smooth-scroll";
import {Link} from "@mui/material";

const ActionButton = ({children}) => {
    return (
        // TODO: Replace hardcoded colors with useTheme -> palette
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
            {/*// TODO: onClick -- navigate to Creat Account: Coach or Athlete*/}
            {/*Maybe don't use AnchorLink. No scroll to section*/}
            <AnchorLink>
                {children}
            </AnchorLink>
        </Link>
    );
};

export default ActionButton;