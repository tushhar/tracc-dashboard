import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import WorkBundles from './components/WorkBundles';
import Areas from './components/Areas';
import Assessments from './components/Assessments';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/work-bundles" element={<WorkBundles />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;