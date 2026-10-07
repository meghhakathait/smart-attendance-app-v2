import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";
import ViewDefaulters from "../../components/ViewDefaulters";

const DefaulterStudent = () => {
  const { classId } = useParams();
  const [viewDefaulters, setViewDefaulters] = useState(null);

  const handleViewDefaulters = async (classId) => {
    try {
      const res = await api.get(`/teacher/classes/${classId}/defaulters`);
      console.log(res.data);
      setViewDefaulters(res.data.defaulters);
    } catch (error) {
      showToast("error", "error in view requests");
    }
  };

  useEffect(() => {
    handleViewDefaulters(classId);
  }, [classId]);
  return (
    <div>
      <ViewDefaulters
        defaulters={viewDefaulters}
        classId={classId}
        // handleDefaulters={handleViewDefaulters}
      />
    </div>
  );
};

export default DefaulterStudent;
