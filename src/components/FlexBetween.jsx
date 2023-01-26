import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

// This allows us to reuse these CSS properties in different areas
export default FlexBetween;