import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { fetchWithAuth } from '../utils/api';

interface Assessment {
  id: string;
  area: string;
  name: string;
  status: string;
}

const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined);
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    fetchAssessments();
    fetchAreas();
  }, []);

  const fetchAssessments = async () => {
    try {
      const data = await fetchWithAuth('assessments');
      setAssessments(data);
    } catch (error) {
      console.error('Failed to fetch assessments:', error);
    }
  };

  const fetchAreas = async () => {
    try {
      const data = await fetchWithAuth('areas');
      setAreas(data.map((area: any) => area.name));
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    }
  };

  const filteredAssessments = selectedArea && selectedArea !== 'all'
    ? assessments.filter(assessment => assessment.area === selectedArea)
    : assessments;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assessments</h1>
      <div className="mb-4">
        <Select onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            {areas.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell>{assessment.id}</TableCell>
              <TableCell>{assessment.area}</TableCell>
              <TableCell>{assessment.name}</TableCell>
              <TableCell>{assessment.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Results</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Assessments;