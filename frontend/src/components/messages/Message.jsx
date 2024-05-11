import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const isLoggedUser = message.senderId === authUser._id;
    const chatClassName = isLoggedUser ? "chat chat-end" : "chat chat-start";
    const profilePic = isLoggedUser ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = isLoggedUser ? "bg-blue-500" : "";
    const formattedTime = extractTime(message.createdAt);

    return (
        <div className={`${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic}
                    alt="user avatar" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor}`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    )
}

export default Message