import { useEffect } from "react";


const Notification = ({ title, content, onClose }) => {
    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 4000);
    }
    )

    return (
        <div className=" bg-red-950 text-white fixed right-0 top-0 m-3 p-10 rounded-lg border-yellow-500 border-2 border-dashed ">
            <div className="w-full flex justify-center items-center flex-col">
                <div className="close w-7 h-7 bg-black cursor-pointer top-0 right-0 m-2 absolute text-center rounded-full text-yellow-500 " onClick={onClose}>X</div>
                <strong className=" text-4xl">{title}</strong>
                <p>{content}</p>

                <img src="/assets/jw.gif" className="rounded-lg " alt="" />
            </div>


        </div>
    );
}
export default Notification;