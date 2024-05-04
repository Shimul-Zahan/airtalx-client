import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const [blogs, setBlogs] = useState([]);
    const blogDescription = useParams();
    useEffect(() => {
        const url = "http://localhost:5000/newBlogs";
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const blogData = data.find((blog) => blog._id === blogDescription._id);
            setBlogs(blogData);
            console.log(blogData);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto my-12">
            <h3 className="text-4xl font-semibold text-center">{blogs.blogTitle}</h3>
            <p className="pt-4 text-justify">{blogs.blogBody}</p>
        </div>
    );
};

export default BlogDetails;