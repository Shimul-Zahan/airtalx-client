import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    // alert(`${user.name} is an admin now`);
                    setUsers(prevUsers => {
                        return prevUsers.map(prevUser => {
                            if (prevUser._id === user._id) {
                                return { ...prevUser, role: 'admin' };
                            } else {
                                return prevUser;
                            }
                        });
                    });
                }
            })
    }
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="text-base">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? 'admin' : <div className="flex gap-4">
                                    <p>user</p>
                                </div>}
                                </td>
                                <td >
                                    <div className="flex items-center gap-4">
                                        <div className="text-red-600 text-xl cursor-pointer"><RiDeleteBin6Line /></div>
                                        {
                                            user.role === 'admin' ? <button>Make user</button> :
                                                <button onClick={() => handleMakeAdmin(user)}>Make Admin</button>
                                        }
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;