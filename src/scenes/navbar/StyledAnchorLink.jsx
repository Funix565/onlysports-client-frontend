import AnchorLink from "react-anchor-link-smooth-scroll";

// Reusable in info navbar
const StyledAnchorLink = ({page, selectedPage, setSelectedPage}) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "")
    return (
        // TODO: Replace hard-coded color with useTheme -> palette
        <AnchorLink
            style={{
                textDecoration: 'none',
                color: selectedPage === lowerCasePage ? "#FF6B66" : "",
                transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "150ms"
            }}
            href={`#${lowerCasePage}`}
            onClick={() => setSelectedPage(lowerCasePage)}
        >
            {page}
        </AnchorLink>
    );
};

export default StyledAnchorLink;
