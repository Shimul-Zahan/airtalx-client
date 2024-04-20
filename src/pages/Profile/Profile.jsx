import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Profile = () => {
    const [userData, setUserData] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const url = `http://localhost:5000/users?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUserData(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="lg:w-3/4 w-11/12 mx-auto">
            {
                userData.map(myProfile => <div key={myProfile._id}>
                    <div className="flex gap-5">
                        <div>
                            <h3 className="font-semibold text-2xl">{myProfile.name}</h3>
                            <p>{myProfile.email}</p>
                            <p>{myProfile.role}</p>
                        </div>
                        <div className="w-36 h-36 relative">
                            <img className="rounded-full w-full h-full object-cover" src={myProfile.photoURL} alt="" />
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Profile;