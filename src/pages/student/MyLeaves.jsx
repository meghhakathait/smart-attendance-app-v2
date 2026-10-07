import React, { useEffect, useState } from "react";
import LeaveForm from "../../components/form/LeaveForm";
import Modal from "../../components/layout/Modal";
import Button from "../../components/form/Button";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";

const MyLeaves = () => {
  const [isModal, setIsModal] = useState(false);
  const [leave, setLeave] = useState(null);

  const fetchleaves = async () => {
    try {
      const res = await api.get("/leave/mine");
      setLeave(res.data.requests);
    } catch (error) {
      showToast("error", "error in fetching leave data");
    }
  };
  useEffect(() => {
    fetchleaves();
  }, []);
  return (
    <div>
      <div className="py-5">
        <div className="flex items-center justify-end p-5 bg-emerald-700 rounded-md">
          <Button onClick={() => setIsModal(true)}>Add Leave</Button>

          {isModal && (
            <Modal onClose={setIsModal}>
              <LeaveForm onClose={setIsModal} />
            </Modal>
          )}
        </div>

        <div className="mt-5  bg-emerald-700 p-5 rounded-md">
          <h2 className="text-2xl mb-6">Leave Requests</h2>
          
          {leave ? (
            leave.map((item,i) => (
              <div key={i} className="flex items-center mb-4 bg-emerald-800 rounded-md p-4">
                <div className="w-2/12">{i + 1}</div>
                <div className="w-3/12">{item.class.name}</div>
                <div className="w-2/12">{item.status}</div>
                <div className="w-4/12">{item.reviewNote ?? "No review yet"}</div>
              </div>
            ))
          ) : (
            <p>No requests to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLeaves;
