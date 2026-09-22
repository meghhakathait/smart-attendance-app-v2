import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";
import Button from "../../components/form/Button";
import ViewSession from "../../components/ViewSession";
import Modal from "../../components/layout/Modal";

const MyClasses = () => {
  const [allClasses, setAllClasses] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/teacher/classes");
      setAllClasses(res.data.classes);
    } catch (error) {
      showToast("error", "Error fetching classes");
    }
  };

  const handleGenerateQR = async (id) => {
    try {
      const res = await api.post(`/attendance/sessions`, { classId: id });
      setSessionDetails(res.data);
      setShowModal(true);
    } catch (error) {
      showToast("error", "Error generating the QR");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="py-5">
      <div className="mt-5 bg-emerald-700 p-5 rounded-ms">
        <h2 className="mb-10 font-bold text-lg">Classes</h2>
        <div className="grid grid-cols-3 gap-4">
          {allClasses ? (
            allClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="p-6 rounded-md bg-emerald-900"
              >
                <h3 className="font-bold text-lg mb-3 flex justify-between">
                  {classItem.name}{" "}
                  <span>{classItem.isActive ? "isActive" : "Inactive"}</span>
                </h3>
                <h5 className="italic">[{classItem.code}]</h5>
                <p className="mb-4">
                  Total Students:{classItem.students.length}
                </p>
                {/* <div className="flex gap-4 items-center">
                   <Link to={`/admin/class/view/${classItem._id}`}>View</Link>
                   <Link to={`/admin/class/edit/${classItem._id}`}>Edit</Link>
                 </div> */}

                <Button onClick={() => handleGenerateQR(classItem._id)}>
                  Start Session
                </Button>
              </div>
            ))
          ) : (
            <p>No classes to show</p>
          )}
        </div>
      </div>

      {showModal && sessionDetails && (
        <Modal onClose={() => setShowModal(false)}>
          <ViewSession
            sessionDetails={sessionDetails}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyClasses;
