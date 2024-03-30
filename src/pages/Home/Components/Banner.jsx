import Lottie from "lottie-react";
import BannerModel from "../../../../public/banner-model.json"

const Banner = () => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-6xl font-semibold text-[#287180]">One of the largest Outsourcing Marketplace</h1>
                    <p className="text-2xl font-semibold py-8">An easy way to find your dream job or virtual assistant and build your outstanding project</p>
                    <button className="bg-[#1d9cb5] text-white text-2xl rounded px-2 py-2 font-semibold">Get Started</button>
                </div>
                <div className="w-3/4">
                    <Lottie animationData={BannerModel} />
                </div>
            </div>
        </div>
    );
};

export default Banner;