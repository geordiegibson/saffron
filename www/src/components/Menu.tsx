import { Link } from "react-router-dom"

interface MenuProps {
    page: "trade" | "direct" | "wallet" | "chat"
}

const Menu = (props: MenuProps) => {

    return (
        <div className="flex flex-col w-screen items-center justify-center">

            <nav className="fixed bottom-4 z-30 mx-auto flex w-max flex-row items-center justify-center gap-1 overflow-visible rounded-full p-1 shadow-lg ring-1 backdrop-blur-sm bg-zinc-900 ring-zinc-700/50">

                <Link to="/" className="group relative flex select-none items-center rounded-full p-3 outline-none transition-all duration-400 bg-zinc-900 hover:bg-slate-800">
                    <svg className="h-5" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                </Link>

                <div className="mx-1 h-4 w-[1px] bg-white/20 md:mx-2"></div>
                
                <Link to="/trade" className={`${props.page === 'trade' ? "bg-white" : "hover:bg-slate-800"} group relative flex select-none items-center rounded-full p-3 outline-none transition-all duration-400`}>
                    <svg className="h-4" fill={props.page === 'trade' ? 'black' : 'white'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-64L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64 320 0z"/></svg>
                </Link>

                <Link to="/direct" className={`${props.page === 'direct' ? "bg-white" : "hover:bg-slate-800"} group relative flex select-none items-center rounded-full p-3 outline-none transition-all duration-400`}>
                    <svg className="h-4" xmlns="http://www.w3.org/2000/svg" fill={props.page === 'direct' ? 'black' : 'white'}  viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                </Link>

                <Link to="/chat" className={`${props.page === 'chat' ? "bg-white" : "hover:bg-slate-800"} group relative flex select items-center rounded-full p-3 outline-none transition-all duration-400`}>
                    <i style={{ color: props.page === 'chat' ? 'black' : 'white' }} className="h-4 bi bi-chat-left-fill"></i>         
                </Link>

                <Link to="/wallet" className={`${props.page === 'wallet' ? "bg-white" : "hover:bg-slate-800"} group relative flex select items-center rounded-full p-3 outline-none transition-all duration-400`}>
                    <svg className="h-4" fill={props.page === 'wallet' ? 'black' : 'white'} viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                </Link>
            </nav>
        </div>
    )
}

export default Menu