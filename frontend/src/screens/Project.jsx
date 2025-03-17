// import React, { useState, useEffect, useContext } from 'react'
// import { UserContext } from '../context/user.context'
// import { useNavigate, useLocation } from 'react-router-dom'
// import axios from '../config/axios'
// import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
// import '../index.css'


// const Project = () => {

//     const location = useLocation()

//     const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [selectedUserId, setSelectedUserId] = useState(new Set())
//     const [project, setProject] = useState(location.state.project)
//     const [message, setMessage] = useState('')
//     const { user } = useContext(UserContext)

//     const messageBox = React.useRef();
//     const [users, setUsers] = useState([])

//     const handleUserClick = (id) => {
//         setSelectedUserId(prevSelectedUserId => {
//             const newSelectedUserId = new Set(prevSelectedUserId);
//             if (newSelectedUserId.has(id)) {
//                 newSelectedUserId.delete(id);
//             } else {
//                 newSelectedUserId.add(id);
//             }

//             return newSelectedUserId;
//         });


//     }


//     function addCollaborators() {

//         axios.put("/projects/add-user", {
//             projectId: location.state.project._id,
//             users: Array.from(selectedUserId)
//         }).then(res => {
//             console.log(res.data)
//             setIsModalOpen(false)   

//         }).catch(err => {
//             console.log(err)
//         })

//     }

//     const send = () => {

//         console.log(user)

//         sendMessage('project-message', {
//             message,
//             sender: user
//         })
//         appendOutgoingMessage(message)
//         setMessage("")

//     }

//     useEffect(() => {

//         const socket = initializeSocket(project._id)


//         receiveMessage('project-message', data => {
//             console.log(data)
//             appendIncomingMessage(data);
//         })


//         axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

//             console.log(res.data.project)

//             setProject(res.data.project)
//         }).catch(err => {
//             console.log(err)
//         })

//         axios.get('/users/all').then(res => {

//             setUsers(res.data.users)

//         }).catch(err => {

//             console.log(err)

//         })

//     return () => {
//         socket.disconnect();
//     };
//     }, [])
//     function appendIncomingMessage(messageObject) {

//         const messageBox = document.querySelector('.message-box')

//         const message = document.createElement('div')
//         message.classList.add('message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md')
//         message.innerHTML = `
//                 <small class='opacity-65 text-xs'>${messageObject.sender.email}</small>
//                 <p class='text-sm'>${messageObject.message}</p>
//             `
//         messageBox.appendChild(message)
//         scrollToBottom()
//     }

//     function appendOutgoingMessage(message) {

//         const messageBox = document.querySelector('.message-box')

//         const newMessage = document.createElement('div')
//         newMessage.classList.add('ml-auto', 'max-w-56', 'message', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md')
//         newMessage.innerHTML = `
//                     <small class='opacity-65 text-xs'>${user.email}</small>
//                     <p class='text-sm'>${message}</p>
//                 `
//         messageBox.appendChild(newMessage)
//         scrollToBottom()
//     }

//     function scrollToBottom() {
//         messageBox.current.scrollTop = messageBox.current.scrollHeight
//     }
//     function toggleSidePandel(){
//         alert("arey bhaai");
//     }

//     return (
//         <main className='h-screen w-screen flex'>
//             <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
//                 <div className='flex justify-between items-center p-2 px-4 w-full bg-slate-100  top-0'>
//                     <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
//                         <i className="ri-add-fill mr-1"></i>
//                         <p>Add collaborator</p>
//                     </button>
//                     <button onClick={toggleSidePandel} className='p-2 '>
//                         <i className="ri-group-fill"></i>
//                     </button>
//                 </div>
//                 <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">

//                     <div
//                         ref={messageBox}
//                         className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
//                     </div>
//                     <div className="inputField w-full flex absolute bottom-0">
//                         <input
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
//                         <button
//                             onClick={send}
//                             className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i>
//                         </button>
//                     </div>
//                 </div>
//                 <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
//                     <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>

//                         <h1
//                             className='font-semibold text-lg'
//                         >Collaborators</h1>

//                         <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
//                             <i className="ri-close-fill"></i>
//                         </button>
//                     </header>
//                     <div className="users flex flex-col gap-2">

//                         {project.users && project.users.map(user => {


//                             return (
//                                 <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
//                                     <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
//                                         <i className="ri-user-fill absolute"></i>
//                                     </div>
//                                     <h1 className='font-semibold text-lg'>{user.email}</h1>
//                                 </div>
//                             )


//                         })}
//                     </div>
//                 </div>
//             </section>
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
//                         <header className='flex justify-between items-center mb-4'>
//                             <h2 className='text-xl font-semibold'>Select User</h2>
//                             <button onClick={() => setIsModalOpen(false)} className='p-2'>
//                                 <i className="ri-close-fill"></i>
//                             </button>
//                         </header>
//                         <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
//                             {users.map(user => (
//                                 <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
//                                     <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
//                                         <i className="ri-user-fill absolute"></i>
//                                     </div>
//                                     <h1 className='font-semibold text-lg'>{user.email}</h1>
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             onClick={addCollaborators}
//                             className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
//                             Add Collaborators
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     )
// }

// export default Project

import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../context/user.context'
import { useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import '../index.css'
import Markdown from 'markdown-to-jsx';
import { use } from 'react';
function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [props.className, props.children])

    return <code {...props} ref={ref} />
}

const Project = () => {
    const location = useLocation()
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(new Set())
    const [project, setProject] = useState(location.state.project)
    const [message, setMessage] = useState('')
    const { user } = useContext(UserContext)
    const messageBox = React.useRef()
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]); //state variable for mesaages

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            newSelectedUserId.has(id) ? newSelectedUserId.delete(id) : newSelectedUserId.add(id);
            return newSelectedUserId;
        });
    }

    function addCollaborators() {
        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(() => {
            setIsModalOpen(false)
        }).catch(console.log)
    }

    const send = () => {
        sendMessage('project-message', { message, sender: user })
        // appendOutgoingMessage(message)
        setMessages(prevMessages => [...prevMessages, { sender: user, message }]) // Update messages state
        setMessage("")
    }

    useEffect(() => {
        const socket = initializeSocket(project._id)
        // receiveMessage('project-message', appendIncomingMessage)
        receiveMessage('project-message', data => {
            setMessages(prevMessages => [...prevMessages, data]) // Update messages state
        })
        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
            setProject(res.data.project)
        }).catch(console.log)

        axios.get('/users/all').then(res => setUsers(res.data.users)).catch(console.log)

        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    //remove append incoming and appendougoing functions

    function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }

    return (
        <main className='h-screen w-screen flex'>
            <section className="left flex flex-col h-screen min-w-96 bg-slate-300">
                <div className='flex justify-between items-center p-2 px-4 w-full bg-slate-100'>
                    <button onClick={() => setIsModalOpen(true)} className='flex gap-2'>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </div>
                <div className="conversation-area relative flex flex-col flex-grow h-full overflow-hidden">
                    <div ref={messageBox} className="message-box p-1 flex-grow flex flex-col gap-1 overflow-y-auto max-h-full scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-54'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <p className='text-sm'>
                                    {msg.sender._id === 'ai' ?

                                        <div
                                            className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
                                        >
                                            <Markdown
                                                children={msg.message}
                                                options={{
                                                    overrides: {
                                                        code: SyntaxHighlightedCode,
                                                    },
                                                }}
                                            />
                                        </div>
                                        : msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="inputField w-full flex">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                        <button onClick={send} className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>

                    {/* Side Panel inside conversation-area, now sliding in from left */}
                    <div className={`sidePanel absolute top-0 left-0 w-full h-full bg-slate-50 transition-transform ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
                            <h1 className='font-semibold text-lg'>Collaborators</h1>
                            <button onClick={() => setIsSidePanelOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users flex flex-col gap-2 overflow-y-auto max-h-[calc(100%-3rem)]">
                            {project.users?.map(user => (
                                <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user._id} onClick={() => handleUserClick(user._id)} className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.has(user._id) ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`}>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button onClick={addCollaborators} className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>Add Collaborators</button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Project