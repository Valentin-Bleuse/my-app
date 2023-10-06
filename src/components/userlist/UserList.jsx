import { useEffect, useRef } from "react";
import User from "../user/User";
import gsap from "gsap";


function refreshPage() {

    window.location.reload(false);
}




const UserList = ({ users, selectedUser, setSelectedUser, setUsers }) => {

    console.log("users", selectedUser);

    const listRef = useRef();

    useEffect(() => {
        gsap.to(listRef.current.children, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
        });

    }, [users]);






    const resetNotification = (user) => {
        const _users = [...users];

        const index = _users.findIndex((_user) => _user.userID === user.userID);

        _users[index].hasNewMessages = false;

        setUsers(_users);
    };

    return (
        <div ref={listRef} className=" fixed top-50 left-12 ml-3 rounded-3xl  w-40  h-4/6  bg-white text-black flex flex-col justify-center items-center border-red-900 border-3 ">
            <div className={` ${"cursor-pointer"} ${selectedUser ? "" : "selectedUser cursor-pointer bg-gray-950 text-red-500 rounded-full p-2 px-6"} `} onClick={() => setSelectedUser(null)} > Général</div>
            {

                users.map((user) => {
                    return user.connected ? (
                        <User
                            key={user.userID}
                            user={user}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            resetNotification={resetNotification}
                        />
                    ) : null;
                })}
        </div >
    );
};


export default UserList;
