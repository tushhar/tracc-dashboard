import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { fetchWithAuth } from '../utils/api';

interface DashboardData {
  workBundles: { total: number; inProgress: number };
  areas: { total: number; categories: number };
  assessments: { completed: number; pending: number };
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    workBundles: { total: 0, inProgress: 0 },
    areas: { total: 0, categories: 0 },
    assessments: { completed: 0, pending: 0 },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [workBundles, areas, assessments, areaCategories] = await Promise.all([
        fetchWithAuth('workBundles'),
        fetchWithAuth('areas'),
        fetchWithAuth('assessments'),
        fetchWithAuth('areaCategories'),
      ]);

      setDashboardData({
        workBundles: {
          total: workBundles.length,
          inProgress: workBundles.filter((wb: any) => wb.status === 'In Progress').length,
        },
        areas: {
          total: areas.length,
          categories: areaCategories.length,
        },
        assessments: {
          completed: assessments.filter((a: any) => a.status === 'Completed').length,
          pending: assessments.filter((a: any) => a.status === 'Pending').length,
        },
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Work Bundles</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: {dashboardData.workBundles.total}</p>
            <p>In Progress: {dashboardData.workBundles.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: {dashboardData.areas.total}</p>
            <p>Categories: {dashboardData.areas.categories}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Completed: {dashboardData.assessments.completed}</p>
            <p>Pending: {dashboardData.assessments.pending}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;