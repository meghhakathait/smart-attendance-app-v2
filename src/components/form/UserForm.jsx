import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";

const UserForm = ({ isUpdate, data, fetchUsers, onClose }) => {
  const init = {
    role: "",
    name: "",
    email: "",
    password: "",
  };
  const roleOptions = [
    { value: "admin", text: "Admin" },
    { value: "teacher", text: "Teacher" },
    { value: "student", text: "Student" },
  ];

  const [formData, setFormData] = useState(() => {
    if (data) {
      let roleProp = data.role === "student" ? "studentId" : "employeeId";
      return { ...init, [roleProp]: "", phone: "" };
    }
    return { ...init };
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/users", formData);
      showToast("success", "User added successfully");
      setFormData(init);
      fetchUsers(res.data.user.role);
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to add user");
    }
  };

  const handleUpdateUser = async (id) => {  // event handling idher nhi ayega becoz jaha call krege func vhi ayega
    try {
      const res = await api.put(`/admin/users/${id}`, formData);
      showToast("success", "User updated successfully");
      onClose(false);
      fetchUsers(res.data.user.role);
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to update user");
    }
  };

  useEffect(() => {
    if (isUpdate && data) {
      //data server se ara hai isliye data bhi diya hai

      // setFormData(data) - but bcoz phone nd studentId initial mai empty hai  but ye func run k baad data update ho jayega nd ph nd stuId frse empty reh jayegi bcoz vo humne pass hi nhi kiya hai data mai isliye humne spread operator use kiya hai ki jo data humne pass kiya hai vo formData mai update ho jaye nd baki jo empty hai vo empty hi rhe
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [isUpdate, data]); //dependency - dono maise ksii maibhi chnge ayega tb re-render hoga

  return (
    <div className="py-2">
      <h2 className="text-xl font-medium mb-6">
        {isUpdate ? "Update" : "Add"} User
      </h2>
      <form>
        {!isUpdate && (
          <CustomSelect
            label="Role"
            name="role"
            id="role"
            value={formData.role} // ye value kisi bhi case mai undefined nhi honi chahiye kiuki issko hum khudse control kr rhe hai value attribute ka use krke
            options={roleOptions}
            onChange={handleInput}
          />
        )}

        <CustomInput
          label="Name"
          name="name"
          onChange={handleInput}
          value={formData?.name}
        />

        {isUpdate ? (
          <>
            <CustomInput
              label="Phone"
              name="phone"
              type="number"
              min="10"
              max="10"
              value={formData?.phone}
              onChange={handleInput}
            />
            <CustomInput
              label={data.role === "student" ? "Student Id" : "Employee Id"}
              id={data.role === "student" ? "studentId" : "employeeId"}
              name={data.role === "student" ? "studentId" : "employeeId"}
              value={
                data.role === "student"
                  ? formData.studentId
                  : formData.employeeId
              }
              onChange={handleInput}
            />
            {/* 2nd option tha ki pura hi component dusera bana k ye kr skte the */}
          </>
        ) : (
          <>
            <CustomInput
              name="email"
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInput}
            />
            <CustomInput
              name="password"
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInput}
            />
          </>
        )}

        {isUpdate ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleUpdateUser(formData._id);
            }}
          >
            Update User
          </Button>
        ) : (
          //event humne idher isliye lagaya update func mai nhi bcoz event pr humko event func milta hai or yha event joki 'click' hai usper arrow func lagaya hai humne kiuki para bhi pass krna tha func k isliye event pr arrow func lagaya . to mtlb event pr arrow func chlra toh usi ko event milega
          <Button onClick={handleAddUser}>Add User</Button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
