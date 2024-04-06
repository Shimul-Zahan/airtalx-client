
const PostJob = () => {
    const PostAJob = (e) => {
        e.preventDefault();
        const form = e.target;
        const headline = form.headline.value;
        const jobType = form.jobType.value;
        const jobTitle = form.jobTitle.value;
        const salary = form.salary.value;
        const jobDescription = form.jobDescription.value;

        const newJobPost = {headline, jobType, jobTitle, salary, jobDescription}
        fetch('http://localhost:5000/newJobPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJobPost)
        })
        .then(res => res.json())
        .then(data => {
            console.log('new job is created',data);
        })
        .catch(error => {
            console.error('Error storing user data:', error);
        });
    }
    return (
        <form onSubmit={PostAJob} className="p-6 pb-0">
            <div className="custom-shadow p-4 rounded-md mb-7">
                <div className="">
                    <h4 className="text-2xl font-semibold">Job Headline</h4>
                    <p>Write a compelling headline</p>
                </div>
                <div>
                    <input name='headline' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-full" placeholder="e.g: I'm looking for a professional data researcher" type="text" />
                </div>
                <div className="pt-8">
                    <h4 className="text-2xl font-semibold">Job Type</h4>
                    <select name='jobType' className="bg-gray-100 border border-gray-200 p-3 w-[15%] rounded-md mt-4" id="">
                        <option value="">Select</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                    </select>
                </div>
                <div className="pt-8">
                    <h4 className="text-2xl font-semibold">Job Title</h4>
                    <div>
                        <input name='jobTitle' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-full" placeholder='e.g: "Virtual Assistant", "Graphic Designer", "Bookkeeper"' type="text" />
                    </div>
                </div>
                <div className="pt-8">
                    <h4 className="text-2xl font-semibold">Salary</h4>
                    <p>How much do you want to pay per hour?</p>
                    <div>
                        <input name='salary' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-[15%]" placeholder='e.g: "$6.00/hr", "$5.00/hr-$8.00/hr"' type="text" />
                    </div>
                </div>
                <div className="pt-8">
                    <h4 className="text-2xl font-semibold">Job Description</h4>
                    <p>Write a detailed job description. Include all the essential information</p>
                    <div>
                        <textarea name='jobDescription' className="bg-gray-100 border border-gray-200 p-3 rounded-md mt-4 w-full" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div>
                    <button className="bg-[#1d9cb5] text-white text-xl mt-2 rounded px-4 py-2">Create Job</button>
                </div>
            </div>
        </form>
    );
};

export default PostJob;