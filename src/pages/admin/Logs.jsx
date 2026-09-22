import React, { useEffect, useState } from "react";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";

const Logs = () => {
  const [logs, setLogsList] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/audit-logs");
      setLogsList(res.data.logs);
    } catch (error) {
      showToast("error", "failed to fetch Logs");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="mt-5 bg-emerald-700 p-5 rounded-md">
      <h2 className="text-2xl mb-6">Logs</h2>
      {logs &&
        logs.map(({action, performedBy:{name,email,role},targetType},i) => (
          <div className="flex items-center mb-4 bg-emerald-800 rounded-md p-4">
            <div className="w-2/12">{i + 1}</div>
            <div className="w-3/12">{action}</div>
            <div className="w-2/12">{name}</div>
            <div className="w-3/12">{email}</div>
            <div className="w-1/12">{role}</div>
            <div className="w-2/12">{targetType}</div>
          </div>
        ))}
    </div>
  );
};

export default Logs;
