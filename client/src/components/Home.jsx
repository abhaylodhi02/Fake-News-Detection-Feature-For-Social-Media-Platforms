import { NavLink } from "react-router-dom";

export default function Home() {
    const text = `Let's Get Started!`

    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Container for the main section */}
            <aside className="relative overflow-hidden text-black rounded-lg mx-2 sm:mx-8 py-12 sm:py-16" style={{height: "auto"}}>
                
                {/* Main content */}
                <div className="relative z-10 max-w-screen-xl mx-auto text-center sm:text-left">
                    <div className="max-w-xl mx-auto sm:ml-auto space-y-8">
                        <h2 className="text-3xl sm:text-5xl font-bold">
                            Threads
                            <span className="block sm:hidden text-2xl mt-2">Enjoy A Safe Thread Environment!</span>
                        </h2>

                        <NavLink
                            to="PostDisplay"
                            className="inline-block text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </NavLink>
                    </div>
                </div>

                {/* Background image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img className="w-full h-auto max-w-md sm:max-w-lg object-cover" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
                </div>
            </aside>

            {/* Image below the main section */}
            <div className="grid place-items-center mt-10 sm:mt-20">
                <img className="w-64 sm:w-96" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>

            {/* Heading */}
            <h1 className="text-center text-3xl sm:text-5xl py-8 font-medium">{text}</h1>
        </div>
    );
}
