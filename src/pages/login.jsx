import { useEffect, useRef, useState, } from "react";

import { useRouter } from "next/router";



const Login = () => {
    const [error, SetError] = useState("");
    const inputRef = useRef();
    const { push } = useRouter();

    const onkeydown = (e) => {
        if (e.keyCode === 13) {

            console.log("Enter key pressed");
            console.log(inputRef.current.value);

            localStorage.setItem("username", inputRef.current.value);
            inputRef.current.value = "";
            push("/");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("error") == 200) {
            console.log("error 100");
            SetError("server down, make yourself a coffe, we're working on it 😉");
        }

    }), [];



    return (
        <div className="flex justify-center items-center flex-col h-screen">



            <div className=" flex justify-center items-center flex-col h-screen">
                <h1>Login</h1>

                <input
                    ref={inputRef}
                    type="text"
                    className="rounded-full px-4 py-2  text-black"
                    placeholder="TOn Nom"
                    onKeyDown={onkeydown}
                />
                <p>Enter USername</p>
            </div>
            {error !== "" && <p className=" mt-11 text-red-700  text-4xl">{error}</p>}


        </div>
    )
}
export default Login;