import errorImg from "./error.gif"

export default function Error() {
    return <img src={errorImg} alt="error" style={{display: "block", margin: "0 auto", height: "200px", width: "200px"}} />
}