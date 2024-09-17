import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { fetchWithAuth } from '../utils/api';

interface Area {
  id: string;
  name: string;
  parent: string | null;
}

const Areas: React.FC = () => {
  const [viewType, setViewType] = useState('flat');
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const data = await fetchWithAuth('areas', { view: viewType });
      setAreas(data);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, [viewType]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Areas</h1>
      <div className="mb-4">
        <Select onValueChange={(value) => setViewType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flat">Flat View</SelectItem>
            <SelectItem value="tree">Tree View</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area.id}>
              <TableCell>{area.id}</TableCell>
              <TableCell>{area.name}</TableCell>
              <TableCell>{area.parent || 'N/A'}</TableCell>
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

export default Areas;