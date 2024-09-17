import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { fetchWithAuth } from '../utils/api';

interface WorkBundle {
  id: string;
  name: string;
  progress: number;
}

const WorkBundles: React.FC = () => {
  const [workBundles, setWorkBundles] = useState<WorkBundle[]>([]);

  useEffect(() => {
    fetchWorkBundles();
  }, []);

  const fetchWorkBundles = async () => {
    try {
      const data = await fetchWithAuth('workBundles');
      setWorkBundles(data);
    } catch (error) {
      console.error('Failed to fetch work bundles:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Work Bundles</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workBundles.map((bundle) => (
            <TableRow key={bundle.id}>
              <TableCell>{bundle.id}</TableCell>
              <TableCell>{bundle.name}</TableCell>
              <TableCell>{bundle.progress}%</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkBundles;