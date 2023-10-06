import "@/styles/globals.scss";
import "@/pages/globals.css";



export default function App({ Component, pageProps }) {
    return (
        <div>
            <Component {...pageProps} />
        </div>
    );
}