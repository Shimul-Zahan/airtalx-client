import { message } from "antd";

const PostBlog = () => {
    const postABlog = (e) => {
        e.preventDefault();
        const form = e.target;
        const blogTitle = form.blogTitle.value;
        const blogBody = form.blogBody.value;
        const likes = 0;
        const dislikes = 0;
        const reactLike = [];
        const reactDisLike = [];

        const blogPost = { blogTitle, blogBody,likes,dislikes,reactLike,reactDisLike }
        fetch('http://localhost:5000/newBlogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    message.success("Blog Posted Sucessfully!");
                    console.log(data)
                    form.reset();
                }
                else {
                    message.error("Blog did not Posted!")
                }
            })
            .catch(error => {
                console.error('Error storing user data:', error);
            });
    }
    return (
        <div className="m-6 custom-shadow">
            <form onSubmit={postABlog} action="" className="p-6">
                <div className="py-2">
                    <h4 className="text-2xl font-semibold">Blog Headline</h4>
                    <div>
                        <input name='blogTitle' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-full" placeholder='Blog Headline' type="text" />
                    </div>
                </div>
                <div className="pt-8">
                    <h4 className="text-2xl font-semibold">Blog Body</h4>
                    {/* <p>Write a detailed job description. Include all the essential information</p> */}
                    <div>
                        <textarea name='blogBody' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-full" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div>
                    <button className="bg-[#1d9cb5] text-white text-xl mt-2 rounded px-4 py-2">Post Blog</button>
                </div>
            </form>
        </div>
    );
};

export default PostBlog;