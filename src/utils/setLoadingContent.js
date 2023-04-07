import { CircularProgress } from "@mui/material";
import Error from "../components/error/error";


const setLoadingContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return <>
                <Component /> 
                <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/>
            </>;
        case 'success':
            return <Component />;
        case 'failure':
            return <Error />;
        default:
            throw new Error('Unknown process!');
    }
}

export default setLoadingContent;