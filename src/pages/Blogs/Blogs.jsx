import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/newBlogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                console.log(data);
            })
    })
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto my-8">
            <div className="grid grid-cols-3 gap-6">
                {
                    blogs.map(singleBlog => <div className="custom-shadow p-6 rounded-md" key={singleBlog._id}>
                        <h4 className="text-3xl font-semibold pb-3">{singleBlog.blogTitle}</h4>
                        <p>
                            {singleBlog.blogBody.substring(0, 30)}...
                            <Link to={`/blogDetails/${singleBlog._id}`} className="text-[#1d9cb5]" >
                                see more
                            </Link>
                        </p>
                        
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;