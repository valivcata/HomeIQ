// components/EventLogViewer.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { EventLog } from '../types/EventLog';
import api from "../services/api";

const EventLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get<EventLog[]>('/api/eventlog/last', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // sau alt mecanism de auth
        }
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button onClick={fetchLogs} className="bg-blue-500 text-white px-4 py-2 rounded">
        Afișează ultimele 15 evenimente
      </button>

      {loading && <p>Se încarcă...</p>}

      <ul className="mt-4 space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="border p-2 rounded shadow">
            <strong>{log.eventType}</strong> - {new Date(log.timestamp).toLocaleString()}
            <br />
            <em>{log.details}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventLogViewer;
