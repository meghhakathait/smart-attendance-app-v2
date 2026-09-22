import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import ClassForm from "../../components/form/ClassForm";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";
import ViewClass from "../../components/ViewClass";

const Class = () => {
  //useParams()
  const { action, classid } = useParams();
  const [classData, setClassData] = useState(null);

  const fetchClassData = async (id) => {
    try {
      const res = await api.get(`admin/classes/${id}`);
      setClassData(res.data.class);
    } catch (error) {
      showToast("error", "Error fetching class data");
    }
  };

  useEffect(() => {
    if (classid) {
      fetchClassData(classid);
    }
  }, [classid]);
  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center">
        {action === "add" ? (
          <ClassForm />
        ) : action === "edit" && classData ? (
          <ClassForm isUpdate={true} data={classData} />
        ) : action === "view" && classData ? (
          <ViewClass classData={classData} />
        ) : (
          <div>No data </div>
        )}
      </div>
    </div>
  );
};

export default Class;
