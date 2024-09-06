export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            Thread and Tweets Safety!
                        </h2>
                        <p className="mt-6 text-gray-600">
                        <b>Misinformation and disinformation on digital platforms are two major 
                        emerging threats encircling the world, where a vast amount of news and 
                        information is disseminated through social media. Ensuring the credibility
                         of these platforms is crucial but challenging due to the rapid flow of 
                         news and information in the age of lightning-fast internet connectivity.</b>
                        </p>
                        <p className="mt-4 text-gray-600">
                        <b>To enhance the safety and credibility of news and information sources, a Fake 
                        News Detection System is integrated into this platform. It helps users assess 
                        the credibility of news or information circulated through posts and threads.</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}