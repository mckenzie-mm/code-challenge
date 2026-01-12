import MainTitle from "../../components/MainTitle";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { IItem, useList } from "../../context/ListContext";
import { useMyName } from "../../context/MyNameContext";

const  Home = () =>{

    const socket = useSocket();
    const { items, resetItems } = useList(); 
    const { myName, resetMyName } = useMyName(); 
    const navigate = useNavigate();

    const handleClick = (id: string, name: string) => {
        socket?.emit('ENTER_CHAT', { id, myName } ); 
        navigate(`/chat/${id}`, {state: { id, name }}); 
    };

    useEffect(() => {
        // Listen for incoming messages from the server
        socket?.on("USERS_LIST", (users: IItem[]) => {
            const contacts: Array<IItem> = [];
            users.forEach(user => {
                if (user.id !== socket.id) {
                    contacts.push(user);
                }
                if (user.id === socket.id){
                    resetMyName(user.name);
                }
            });
            resetItems(contacts);
        });

        socket?.on('ENTER_CHAT', (msg) => {
            navigate(`/chat/${msg.id}`, {state: { id: msg.id, name: msg.name }}); 
		});

		return () => {
            // @ts-ignore
			socket?.off('CHAT_MESSAGE');
		};
    }, []);

    return (
        <div className="container w-100 h-100">
			<div className="row justify-content-center">
				<div className="col-md-8 col-xl-6">
                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                        <div className="card-header">
                            <MainTitle user={myName}/>
                        </div>
                        <div className="card-body contacts_body">
                            <ul className="contacts">
                                { 
                                    items.map((contact) => {
                                        return (
                                        <li className="contact" key={contact.id} onClick={() => handleClick(contact.id, contact.name)}>
                                            <div className="d-flex bd-highlight">
                                                <div className="img_cont">
                                                    <div className="rounded-circle user_img user_txt" style={{backgroundColor: contact.backgroundColor}}>
                                                        {contact.name[0]}
                                                    </div>
                                                    {/* <span className={contact.online?  "online_icon" : "online_icon offline"}></span> */}
                                                </div>
                                                <div className="user_info">
                                                    <span>{contact.name}</span>
                                                    <p>User Id: {contact.id}</p>
                                                </div>
                                            </div>
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>                                          
					    <div className="card-footer"></div>
                    </div>
				</div>
              </div> 
		  </div>
  );
}

export default Home;