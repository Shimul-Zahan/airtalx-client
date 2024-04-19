import Lottie from "lottie-react";
import BannerModel from "../../../../public/banner-model.json"

const Banner = () => {
    return (
        <div className="lg:py-4 pb-7 pt-12">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="lg:text-7xl text-3xl font-semibold text-[#287180]">One of the largest Outsourcing Marketplace</h1>
                    <p className="lg:text-2xl font-semibold lg:py-8 py-4">Where talents meet opportunity Globally</p>
                    <button className="bg-[#287180] text-white lg:text-2xl text-base rounded px-2 py-2 font-semibold">Get Started</button>
                </div>
                <div className="w-3/4 hidden md:block">
                    <Lottie animationData={BannerModel} />
                </div>
            </div>
        </div>
    );
};

export default Banner;