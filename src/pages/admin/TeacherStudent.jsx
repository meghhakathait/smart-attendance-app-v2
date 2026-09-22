import React, { useEffect, useReducer, useState } from "react";
import Button from "../../components/form/Button";
import Modal from "../../components/layout/Modal";
import UserForm from "../../components/form/UserForm";
import { api } from "../../api/api";
import CustomSelect from "../../components/form/CustomSelect";
import { CircleSlash2, Edit, Eye } from "lucide-react";
import { showToast } from "../../helper/toast-utility";

// reducer(state, action) - reducer function takes two parameters - state - which has current state, action - which is an object with two properties - {type:"", payload:""}
const reducer = (state, action) => {
  // action = {type:"VIEW", payload:user} - payload is optional property.
  switch (action.type) {
    case "VIEW":
      return { contentType: "view", data: action.payload };
    case "EDIT":
      return { contentType: "edit", data: action.payload };
    case "ACTIVE/DEACTIVE":
      return { contentType: "active/deactive", data: action.payload };
    default:
      return state;
  }
};

// setState({ contentType: "view", data: user })

const TeacherStudent = () => {
  const filterOptions = [
    { value: true, text: "Active" },
    { value: false, text: "Inactive" },
  ];
  const [isModal, setIsModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  const [usersList, setUsersList] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentList, setCurrentList] = useState("student");

  // useReducer - to manage complex state.
  // syntax - const [state, dispatch]=useReducer(reducer, initialValue);
  const [state, dispatch] = useReducer(reducer, null);

  const fetchUsers = async (role = "student") => {
    try {
      const res = await api.get(`/admin/users?role=${role}`);
      setUsersList(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveStatus = async (id, isActive) => {
    try {
      const res = await api.patch(
        `/admin/users/${id}/${isActive ? "deactivate" : "reactivate"}`,
      );
      showToast("success",`user ${isActive ? "deactivated" : "reactivated"} successfully`);
      setIsUserModal();
      fetchUsers(res.data.user.role);
    } catch (error) {
      console.log(error);
      showToast("error", `Failed to  ${isActive ? "deactivated" : "reactivated"} user`);
    }
  };

  const handleShowTeachers = () => {
    fetchUsers("teacher");
    setCurrentList("teacher");
  };

  const handleShowStudents = () => {
    fetchUsers("student");
    setCurrentList("student");
  };

  // active/inactive filter
  const handleIsActiveFilter = (e) => {
    //array.filter()

    const filteredList = usersList.filter((user) => {
      return user.isActive === (e.target.value === "true");
    });
    setFilteredUsers(filteredList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-2xl mb-8">Manage Users</h2>
      <div className="flex items-center justify-between p-5 bg-emerald-700 rounded-md">
        <div className="flex items-center gap-4">
          <Button onClick={handleShowTeachers}>Teachers</Button>
          <Button onClick={handleShowStudents}>Students</Button>
        </div>
        <Button onClick={() => setIsModal(true)}>Add User</Button>
      </div>

      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-semibold">
          {currentList === "student" ? "Student List" : "Teacher List"}
        </h2>
        <CustomSelect options={filterOptions} onChange={handleIsActiveFilter} />
      </div>

      <div className="mt-5 bg-emerald-700 p-5 rounded-md">
        {filteredUsers &&
          filteredUsers.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center bg-emerald-900 rounded-md mb-4"
            >
              <div className="w-1/12 p-3">{index + 1}</div>
              <div className="w-2/12 p-3">{user.name}</div>
              <div className="w-3/12 p-3">{user.email}</div>
              <div className="w-2/12 p-3">{user?.phone}</div>
              {user.role == "student" ? 
              
             ( <div className="w-1/12 p-3">{user?.studentId}</div>) : (
              <div className="w-1/12 p-3">{user?.employeeId}</div>
             )
            }
              <div className="w-2/12 p-3">
                {user.isActive ? "Active" : "Inactive"}
              </div>
              <div className="w-2/12 p-3">
                <button
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "VIEW", payload: user });
                    setIsUserModal(true);
                  }}
                >
                  <Eye />
                </button>
                <button
                  disabled={!user.isActive}
                  className={`p-2 cursor-pointer ${user.isActive ? "text-white" : "text-gray-500"}`}
                  onClick={() => {
                    dispatch({ type: "EDIT", payload: user });
                    setIsUserModal(true);
                  }}
                >
                  <Edit />
                </button>
                <button
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "ACTIVE/DEACTIVE", payload: user });
                    setIsUserModal(true);
                  }}
                >
                  <CircleSlash2 />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isModal && (
        <Modal onClose={setIsModal}>
          <UserForm fetchUsers={fetchUsers} />
        </Modal>
      )}

      {isUserModal && (
        <Modal onClose={setIsUserModal}>
          {state.contentType === "view" ? (
            <div>
              <p>Name:{state.data.name}</p>
              <p>Name:{state.data.email}</p>
              <p>Name:{state.data.role}</p>
              <p>Name:{state.data.isActive ? "Active" : "Inactive"}</p>
            </div>
          ) : state.contentType === "edit" ? (
            <div>
              <UserForm
                onClose={setIsUserModal}
                isUpdate={true}
                data={state.data}
                fetchUsers={fetchUsers}
              />
            </div>
          ) : (
            <div>
              {/* isActive: true ? "Deactivate": "Activate" */}
              <p>
                Do you want to {state.data.isActive ? "deactivate" : "activate"}
              </p>
              <div className="w-full flex items-center justify-end gap-2 mt-4">
                <Button
                  onClick={() =>
                    handleActiveStatus(state.data._id, state.data.isActive)
                  }
                >
                  {state.data.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button onClick={() => setIsUserModal(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TeacherStudent;
