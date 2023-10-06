import { useEffect, useRef } from "react";
import gsap from "gsap";

const Message = ({ username, content, fromSelf }) => {



    const messageRef = useRef();
    useEffect(() => {
        gsap.to(messageRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.1,
            ease: "power3.out",
        });
    }
        , []);

    return (
        <div ref={messageRef} className={`${"px-7 overflow-auto scrolling flex justify-start opacity-0"} ${fromSelf ? " justify-end" : ""} `}>
            <span className={`${"text-red-800"} ${fromSelf ? " text-blue-800" : ""}`}> ${username}  </span>
            : {content}
        </div>

    );
};
export default Message;