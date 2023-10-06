
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const User = ({ user, selectedUser, setSelectedUser, resetNotification }) => {
    const userRef = useRef();
    useEffect(() => {
        gsap.to(userRef.current, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power3.out",
        });
        console.log("done")
    }
        , []);
    return (
        <div
            ref={userRef}

            className={` ${"opacity-0 -translate-x-80 cursor-pointer"} ${selectedUser?.userID === user.userID ? " bg-gray-950  rounded-full  p-2 px-6 text-red-500 " : ""}`}
            onClick={() => {
                setSelectedUser(user);
                resetNotification(user);
            }}
        >
            {user.username}
            {user.hasNewMessages === true ? (<span className="text-red-500">  🔥</span>) : null
            }


        </div >
    )
}
export default User;