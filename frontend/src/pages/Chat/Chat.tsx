import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useMyName } from "../../context/MyNameContext";

interface IMessage {
	txt: string;
	src: string
}

export default function Chat() {
	const navigate = useNavigate();
	const location = useLocation();
	const socket = useSocket();
	const { myName } = useMyName(); 
	//
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [input, setInput] = useState('');

  	const { id, name } = location.state || {}; 

	const handleReturn = () => {
		socket?.emit('QUIT_CHAT', id, name); 
		navigate('/'); 
	}

	useEffect(() => {
		// Listen for incoming messages from the server
		socket?.on('QUIT_CHAT', (name) => {
			// For simplicity not using the id
			if (name === myName) { 
				navigate('/');
			}
		});
		return () => {
			// @ts-nocheck
			socket?.off('CHAT_MESSAGE');
		};
	}, [myName]);


	useEffect(() => {
		// Listen for incoming messages from the server
		socket?.on('CHAT_MESSAGE', (rxMsg) => {
			const msg = {txt: rxMsg.txt, src: "rx"}
			setMessages(prevMessages => [...prevMessages, msg]);
		});
		return () => {
			// @ts-nocheck
			socket?.off('CHAT_MESSAGE');
		};
	}, []);

	const sendMessage = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (input) {
			const msg = {txt: input, src: "tx"}
			setMessages(prevMessages => [...prevMessages, msg]);
			socket?.emit('CHAT_MESSAGE', input, id); 
			setInput('');
		}
	};
	
  	return (
    <div className="container w-100 h-100">
		<div className="row justify-content-center">		
			<div className="col-md-8 col-xl-6 chat">
				<div className="card">

					{/* Card Header */}
					<div className="card-header msg_head">	
						<div style={{display: "flex", justifyContent: "space-between"}}>
							<div className="d-flex bd-highlight">
								<div className="chat_img_cont">
									<div className="rounded-circle chat_user_img chat_user_txt" 
										style={{ backgroundColor: "#666"}}
									>
										{name && name[0]}
									</div>
								</div>
								<div className="user_info">
									<span>{name}</span>
									<p>{messages.length} Messages</p>
								</div> 
							</div>
							<div style={{display: "flex", alignItems: "center"}}>
								<i className="return-icon" onClick={handleReturn}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36" height="36"  style={{opacity:1}}>
										<g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M12.9998 8L6 14L12.9998 21"/><path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"/></g>
									</svg>
								</i>	
							</div>
						</div>
					</div>

            		{/* Card Body */}
					<div className="card-body msg_card_body">

						{
							messages.map((msg, id) => {
								return (
								<div className="d-flex justify-content-end mb-4" key={id}>
									<div className={msg.src === "tx" ? "msg_container" : "msg_container_send" }>
										{msg.txt}
									</div>
								</div>);
							})
						}
					
					</div>
					{/* Card Footer */}
					<div className="card-footer">
						<div className="input-group">
							<textarea 
								data-testid="msg-input"
								name="" 
								className="form-control type_msg" 
								placeholder="Type your message..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
							>
							</textarea>
							<div className="input-group-append">
								<span data-testid="send-msg-div" className="input-group-text send_btn" onClick={sendMessage}>
									<i >
										<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="www.w3.org">
										<path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
										</svg>
									</i>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}
