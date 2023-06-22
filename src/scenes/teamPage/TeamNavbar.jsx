import FlexBetween from "../../components/FlexBetween";
import { useTheme, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const TeamNavbar = ({ teamId }) => {
    const theme = useTheme();
    const dark = theme.palette.primary.dark;
    const alt = theme.palette.primary.light;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="2rem">
                <Link
                    component={RouterLink} to={`/team/${teamId}`}
                    color={dark}
                >
                    Team Posts
                </Link>
                <Link
                    component={RouterLink} to={`members`}
                    color={dark}
                >
                    Team Members
                </Link>
                <Link
                    component={RouterLink} to={`calendar`}
                    color={dark}
                >
                    Team Calendar
                </Link>
            </FlexBetween>
        </FlexBetween>
    );
};

export default TeamNavbar;
