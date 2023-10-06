import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const Commands = () => {
    const [sounds, setSounds] = useState({});

    useEffect(() => {
        setSounds({

            sui: new Audio("/assets/sui.mp3"),
            hendek: new Audio("/assets/hendek.mp3"),
            ouh: new Audio("/assets/ouh.mp3")
        });
    }, []);

    useEffect(() => {
        const onCommand = (command) => {
            switch (command) {
                case "/sui":
                    sounds.sui.currentTime = 0;
                    sounds.sui.play();
                    break;
                case "/hendek":
                    sounds.hendek.currentTime = 0;
                    sounds.hendek.play()
                    break;
                case "/ouh":
                    sounds.ouh.currentTime = 0;
                    sounds.ouh.play()
                    break;

                default:
                    break;
            }
        };

        socket.on("command", onCommand);

        return () => {
            socket.off("command", onCommand);
        };
    }, [sounds]);

    return <div></div>;
};

export default Commands;