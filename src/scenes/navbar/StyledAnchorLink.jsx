import AnchorLink from "react-anchor-link-smooth-scroll";
import {Link} from "@mui/material";

// Looks like it is not reusable. Perhaps we should wrap on-the-go when needed
const StyledAnchorLink = ({page, selectedPage, setSelectedPage}) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "")
    return (
        // This works fine. With hover and transition
        // TODO: Replace hard-coded color with useTheme -> palette
        // <Link
        //     underline="hover"
        //     sx={{
        //         color: selectedPage === lowerCasePage ? "#FF6B66" : "",
        //         transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        //         transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        //         transitionDuration: "150ms",
        //         "&:hover" : {
        //             color: "#FFA6A3"
        //         }
        //     }}
        // >
        //     href here ruins all the MUI styling from upper <Link>.
        //     We can place <Link> inside <AnchorLink>, then styles overlay and mess
        // TODO: Find work-around. Perhaps place <Link> inside and provide `to=` there
            <AnchorLink
                href={`#${lowerCasePage}`}
                onClick={() => setSelectedPage(lowerCasePage)}
            >
                {page}
            </AnchorLink>
        // </Link>
    );
};

export default StyledAnchorLink;
