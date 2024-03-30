import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className="bg-[#1d9cb5] text-white p-4">
                <div className="lg:w-3/4 w-11/12 mx-auto">
                    <div className="flex justify-between">
                        <div>
                            <h6 className="font-semibold uppercase pb-2">Services</h6>
                            <div className="flex flex-col">
                                <Link>Find Job</Link>
                                <Link>Find Employee</Link>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-semibold uppercase pb-2">Company</h6>
                            <div className="flex flex-col">
                                <Link>About Us</Link>
                                <Link>Contact</Link>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-semibold uppercase pb-2">Legal</h6>
                            <div className="flex flex-col">
                                <Link>Terms of Use</Link>
                                <Link>Privacy & Policy</Link>
                                <Link>Help and FAQs</Link>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-semibold uppercase pb-2">Social Links</h6>
                            <div className="flex gap-2">
                                <Link className="bg-[#153147] rounded-full p-2"><FaFacebookF /></Link>
                                <Link className="bg-[#153147] rounded-full p-2"><FaInstagram /></Link>
                                <Link className="bg-[#153147] rounded-full p-2"><FaTwitter /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#153147] text-white p-3">
                <div>
                    <p className="text-center">Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;