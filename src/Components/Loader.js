import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader() {
    return (
        <>
            <Stack
                sx={{
                    width: "100%",
                    color: "grey.500",
                    position: "absolute",
                }}
                spacing={2}
            >
                <LinearProgress
                    color="secondary"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 5,
                    }}
                />
            </Stack>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            ></Backdrop>
        </>
    );
}
