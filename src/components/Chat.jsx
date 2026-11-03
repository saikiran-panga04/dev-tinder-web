
import { useState, useEffect, useCallback, useRef } from "react";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [otherUserName, setOtherUserName] = useState("");

    const user = useSelector((state) => state.user);
    const { id: receiverId } = useParams();

    const userId = user?._id;
    const messagesEndRef = useRef(null);

    const getMessages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/chat/${receiverId}`);
            const conversation = response.data?.response?.[0] ?? response.data?.[0];
            const otherParticipant = conversation?.participants?.find(
                (participant) => String(participant._id) === String(receiverId)
            ) ?? conversation?.participants?.find(
                (participant) => String(participant._id) !== String(userId)
            );
            setOtherUserName(otherParticipant?.firstName ?? "Other user");
            const conversationMessages = conversation?.messages ?? [];

            setMessages(conversationMessages.map((message) => ({
                ...message,
                id: message._id ?? message.id,
                senderId: message.sender ?? message.senderId,
            })));
        } catch (error) {
            console.error("Failed to get messages:", error);
        }
    }

    // Receive messages from the other user or server.
    const receiveMessage = useCallback((data) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: data.id ?? `${Date.now()}-${Math.random()}`,
                senderId: data.userId,
                text: data.message,
                createdAt: data.createdAt ?? new Date().toISOString(),
            },
        ]);
    }, []);

    useEffect(() => {
        if (!userId || !receiverId) return;

        socket.emit("joinRoom", { userId, receiverId });
        socket.on("receiveMessage", receiveMessage);

        return () => {
            socket.off("receiveMessage", receiveMessage);
            socket.emit("disconnectRoom", { userId, receiverId });
        };
    }, [userId, receiverId, receiveMessage]);

    useEffect(() => {
        if (!receiverId || !userId) return;
        getMessages();
    }, [receiverId, userId]);

    // Automatically scroll to the latest message.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = () => {
        const trimmedMessage = newMessage.trim();

        if (!trimmedMessage || !userId || !receiverId) return;

        socket.emit("sendMessage", {
            userId,
            receiverId,
            message: trimmedMessage,
        });


        setNewMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="mx-auto flex h-[80vh] max-w-3xl flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg">
            {/* Chat header */}
            <div className="border-b border-base-300 bg-base-200 px-5 py-4">
                <h2 className="text-lg font-bold">DevTinder Chat</h2>
                <p className="text-sm opacity-60">Real-time conversation</p>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center opacity-60">
                        <p>Start the conversation by sending a message!</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isSentByMe = msg.senderId === userId;

                        return (
                            <div
                                key={msg.id}
                                className={`chat ${isSentByMe ? "chat-end" : "chat-start"
                                    }`}
                            >
                                <div className="chat-header mb-1 text-xs opacity-60">
                                 {isSentByMe ? "You" : otherUserName}
                                </div>

                                <div
                                    className={`chat-bubble ${isSentByMe
                                            ? "chat-bubble-primary"
                                            : ""
                                        }`}
                                >
                                    {msg.text}
                                </div>

                                <div className="chat-footer text-xs opacity-50">
                                    {new Date(msg.createdAt).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="flex gap-2 border-t border-base-300 p-4">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered min-w-0 flex-1"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={2000}
                />

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || !userId || !receiverId}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;

