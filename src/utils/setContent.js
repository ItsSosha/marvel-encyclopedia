import { CircularProgress } from "@mui/material";
import Skeleton from "../components/skeleton/Skeleton";
import Error from "../components/error/error";

const setContent = (process, Component, data, skeleton) => {
    switch (process) {
        case 'waiting':
            return skeleton ? <Skeleton /> : <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/>
        case 'loading':
            return <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/>;
        case 'success':
            return <Component data={data} />;
        case 'failure':
            return <Error />;
        default:
            throw new Error('Unknown process!');
    }
}

export default setContent;