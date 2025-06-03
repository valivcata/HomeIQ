import React from 'react';    
import EventLogViewer from './components/EventLogViewer';
import { CssBaseline, Container } from '@mui/material';


function App() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <EventLogViewer />
    </div>
  );
}

export default App;



