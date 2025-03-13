import React from 'react'
import { useLocation } from 'react-router-dom'
const Project = () => {
    const location = useLocation();
    console.log(location.state)
    return (
        <main className='h-screen w-screen flex '>
            <section className='left relative flex flex-col h-full min-w-72 bg-slate-300'>
                <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
                    <button className='p-2'>
                        <i className='ri-group-fill'></i>
                    </button>
                </header>
                <div className='conversation-area flex-grow flex-col'>
                    <div className='message-box p-1 flex-grow flex flex-col gap-1'>
                        <div className='meaasge max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md'>
                            <small className='opacity-65 text-xs'>
                                example@gmail.com
                            </small>
                            <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus explicabo sit tempora provident neque quia quo minus ad aliquid at. Mollitia doloremque reprehenderit cumque ipsam repudiandae eum placeat, obcaecati quidem.</p>
                        </div>
                        <div className='inputField w-full flex'>
                            <input
                                className='p-2 px-4 border-none outline-none'
                                type="text" placeholder='Enter Message'
                            />
                            <button className='flex-grow px-3'>
                                <i className='ri-send-plane-fill'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='sidePanel w-36 h-60 bg-red-600 absolute left-[-100%] top-0'> </div>

            </section>

        </main>
    )
}

export default Project