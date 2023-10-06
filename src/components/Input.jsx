import { socket } from "@/utils/socket";
import { useRef } from "react";
import gsap from "gsap";

const Input = ({ selectedUser, setSelectedUser }) => {
    const inputRef = useRef();


    const onKeyDown = (e) => {

        // detect when user press enter
        if (inputRef.current.value.length !== 0 && e.keyCode === 13) {
            console.log(inputRef.current.value);

            if (selectedUser) {
                socket.emit("private message", {
                    content: inputRef.current.value,
                    to: selectedUser.userID,
                });

                // do this because react doesnt re-render otherwise
                const _selectedUser = { ...selectedUser };

                _selectedUser.messages.push({
                    content: inputRef.current.value,
                    // fromSelf: true,
                    username: localStorage.getItem("username"),
                    from: socket.userID,
                });

                setSelectedUser(_selectedUser);
            } else {
                socket.emit("message", { content: inputRef.current.value });
            }
            let tl = gsap.timeline();
            tl.to("input", {
                transform: "scale(1)",
                boxShadow: "0 0 0 0 rgba(229, 62, 62, 1)",
                duration: 0.1,
                ease: "power3.out"

            }, 0.1);
            tl.to("input", {
                transform: "scale(1.3)",
                boxShadow: "0 0 0 60px rgba(229, 62, 62, 0)",
                duration: 0.2,
                ease: "power3.out"

            }, 0.1);
            tl.to("input", {
                transform: "scale(1)",
                boxShadow: "0 0 0 0 rgba(229, 62, 62, 1)",
                duration: 0.1,
                ease: "power3.out"
            },);




            inputRef.current.value = "";
        }
    };

    return <div className="w-screen flex justify-center items-center sticky bottom-0 bg-black "><input ref={inputRef} className=" w-4/6 text-black rounded-full p-3   mb-6 mt-6 focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-4 " type="text" onKeyDown={onKeyDown} placeholder="Ecris ton message " /></div>;
};

export default Input;