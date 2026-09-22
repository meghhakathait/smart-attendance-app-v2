import React, { useEffect, useRef, useState } from "react";
import { showToast } from "../helper/toast-utility";
import { api } from "../api/api";
import Button from "./form/Button";

const TOKEN_TTL_MS = 40 * 1000;

const ViewSession = ({ onClose, sessionDetails }) => {
  const [qr, setQr] = useState(sessionDetails.qr);
  const [status, setStatus] = useState({
    presentCount: 0,
    totalStudents: 0,
    records: [],
  });
  const [msLeft, er5] = useState(TOKEN_TTL_MS);
  const [sessionLive, setSessionLive] = useState(true);
  const refreshTimer = useRef(null); // do not cause re-rendering
  const statusTimer = useRef(null);

  const refreshQR = async (sessionId) => {
    try {
      const res = await api.get(`/attendance/sessions/${sessionId}/qr`);
      setQr(res.data.qr);
      setMsLeft(TOKEN_TTL_MS);
    } catch (error) {
      showToast("error", "Error fetching session");
    }
  };

  const pollStatus = async (sessionId) => {
    try {
      const res = await api.get(`/attendance/sessions/${sessionId}/status`);
      setStatus(res.data);
      if (!res.data.session.isLive) setSessionLive(false);
    } catch (error) {}
  };

  useEffect(() => {
    pollStatus(sessionDetails.session._id);
    refreshTimer.current = setInterval(() => {
      refreshQR(sessionDetails.session._id);
    }, TOKEN_TTL_MS);
    statusTimer.current = setInterval(() => {
      pollStatus(sessionDetails.session._id);
    }, 5000);

    return () => {
      clearInterval(statusTimer.current);
      clearInterval(refreshTimer.current); //component load hone k time pr nd unmount hone k time pr do brr chlta
    };
  }, []);

  const handleCloseSession = async (sessionId) => {
    const res = await api.patch(`/attendance/sessions/${sessionId}/close`);
    setSessionLive(false);
  };

  return (
    <div className="flex items-center flex-col">
      <div>{sessionLive ? <img src={qr.dataUrl} /> : <p>Session Ended</p>}</div>
      <div className="mt-5">
        <p>
          {status.presentCount} / {status.totalStudents} <span>Checked in</span>
        </p>
      </div>
      <div className="mt-5">
        {sessionLive ? (
          <Button
            onClick={() => handleCloseSession(sessionDetails.session._id)}
          >
            Close Session Early
          </Button>
        ) : (
          <Button onClose={onClose}>Done</Button>
        )}
      </div>
    </div>
  );
};

export default ViewSession;
