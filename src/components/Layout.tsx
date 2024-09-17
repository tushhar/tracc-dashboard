import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Tracc Dashboard</h1>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/work-bundles">Work Bundles</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/areas">Areas</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/assessments">Assessments</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/settings">Settings</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;