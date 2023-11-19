"use client";
import { useEffect, useState, useRef } from "react";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";

import Input from "@/components/Input";
import Commands from "@/components/Commands";
import Notification from "@/components/notification/Notification";
import UserList from "@/components/userlist/UserList";
import Message from "@/components/Message";

const Home = () => {
    const [selectedUser, setSelectedUser] = useState();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState();
    const viewRef = useRef();
    const [users, setUsers] = useState([]);

    const { push } = useRouter();

    const onSession = ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
    };

    const onMessage = (message) => {
        console.log("message reçu chef", message);

        setMessages((oldMessages) => [...oldMessages, message]);


    }

    const getMessagesAtInit = (messagesAtInit) => {
        setMessages(messagesAtInit);


    };

    const onUserConnect = (_user) => {
        setUsers((oldUsers) => [...oldUsers, _user]);
    }

    const onUserDisconnect = (_userID) => {
        const filteredArray = [...users].filter((_user) => _user.userID !== _userID
        );
        setUsers(filteredArray);

    }

    const onConnectionError = (err) => {
        console.log("err", err);
        localStorage.clear("username");
        localStorage.clear("sessionID");
        localStorage.setItem("error", 200);
        push("/login");
    }

    const scrollToBottom = () => {
        viewRef.current.scrollTop = viewRef.current.scrollHeight;
    }

    const getUsersAtInit = (users) => {
        setUsers(users);

    }

    const onError = ({ code, error }) => {
        let title = ''
        let content = ''

        switch (code) {
            case 100:
                title = "Spam ta daronne";
                content = "Stop Spamming, I'm comin' for you!";
                break;

            default:
                break;
        }


        setError({ title, content, });
    }
    const onPrivateMessage = ({ content, from, to, username }) => {
        console.log(content, from, to, username);
        // check from which user the message came from
        const userMessagingIndex = users.findIndex(
            (_user) => _user.userID === from
        );

        console.log(userMessagingIndex);

        const userMessaging = users.find((_user) => _user.userID === from);

        console.log(userMessaging);

        if (!userMessaging) return;

        userMessaging.messages.push({
            content,
            from,
            to,
            username: username,
        });

        if (userMessaging.userID !== selectedUser?.userID) {
            userMessaging.hasNewMessages = true;
        }

        const _users = [...users];
        _users[userMessagingIndex] = userMessaging;

        setUsers(_users);
    };


    useEffect(() => {
        socket.on("user connected", onUserConnect);
        socket.on("user disconnected", onUserDisconnect);
        socket.on("private message", onPrivateMessage);

        return () => {
            socket.off("user connected", onUserConnect);
            socket.off("user disconnected", onUserDisconnect);
            socket.off("private message", onPrivateMessage);
        };
    }, [users]);






    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID");

        // session is already defined
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();

            // first time connecting and has already visited login page
        } else if (localStorage.getItem("username")) {
            const username = localStorage.getItem("username");
            socket.auth = { username };
            socket.connect();
            //   // redirect to login page
        } else {
            push("/login");
        }
        socket.on("error", onError);
        socket.on("session", onSession);
        socket.on("message", onMessage);
        socket.on("messages", getMessagesAtInit);
        socket.on("users", getUsersAtInit);
        socket.on("disconnect", onConnectionError)
        socket.on("connect_error", onConnectionError);


        return () => {
            socket.disconnect();
            socket.off("session", onSession);
            socket.off("message", onMessage);
            socket.off("messages", getMessagesAtInit);
            socket.off("users", getUsersAtInit);
            socket.off("disconnect", onConnectionError);
            socket.off("connect_error", onConnectionError);

            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        scrollToBottom();
    }
        , [messages, selectedUser])

    function refreshPage() {
        window.location.reload(false);
    }
    return (
        <div className=" relative flex justify-center items-center flex-col z-10">
            {error && (
                <Notification
                    title={error.title}
                    content={error.content}
                    onClose={() => setError(null)}


                />
            )}
            <h1 className=" pt-9 pb-9 top-0 text-5xl w-screen text-center text-red-700 cursor-pointer " onClick={refreshPage}>Dark Room</h1>
            <Commands />
            <UserList
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setUsers={setUsers}

            />
            <div className="w-1/5  h-[76vh]  overflow-y-auto" ref={viewRef}>

                {selectedUser ? selectedUser.messages.map((message, key) => {
                    return (
                        <Message
                            key={key}
                            username={message.username}
                            content={message.content}
                            fromSelf={message.from === socket.userID}
                        />
                    );
                })

                    : messages.map((message, key) => {
                        return (
                            <Message
                                key={key}
                                username={message.username}
                                content={message.content}
                                fromSelf={message.from === socket.userID}
                            />
                        );
                    })}

            </div>
            <Input selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
    );
};

export default Home;
