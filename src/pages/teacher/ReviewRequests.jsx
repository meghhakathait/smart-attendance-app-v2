import React, { useEffect, useState } from "react";
import ViewRequests from "../../components/ViewRequests";
import { useParams } from "react-router";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";

const ReviewRequests = () => {
  const { classId } = useParams();
  const [viewRequets, setViewRequests] = useState(null);

  const handleViewRequests = async (classId) => {
    try {
      const res = await api.get(`/leave/class/${classId}`);
      setViewRequests(res.data.requests);
    } catch (error) {
      showToast("error", "error in view requests");
    }
  };

  const handleReview = async (leaveId, decision) => {
    const reqBody = {
      decision,
      reviewNote: "Reviewed by teacher",
    };
    try {
      const res = await api.patch(`/leave/${leaveId}/review`, reqBody);
      showToast("success", `Leave requests reviewed succesfully`);
      handleViewRequests(classId);
    } catch (error) {
      showToast("error", "error in review requests");
    }
  };

  useEffect(() => {
    handleViewRequests(classId);
  }, [classId]);
  return (
    <div>
      <ViewRequests requests={viewRequets} handleReview={handleReview} />
    </div>
  );
};

export default ReviewRequests;
