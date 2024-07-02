import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/@/components/ui/card';
import { Input } from '../components/@/components/ui/input';
import { Button } from '../components/@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/@/components/ui/table';

type DataEntry = {
  id: number;
  name: string;
  value: string;
};

const MVP = () => {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [newEntry, setNewEntry] = useState<DataEntry>({ id: 0, name: '', value: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDataEntries([...dataEntries, { ...newEntry, id: Date.now() }]);
    setNewEntry({ id: 0, name: '', value: '' });
  };

  const calculateInsights = () => {
    // Placeholder for insights calculation logic
    return dataEntries.length;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Entry and Insights</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Add New Data Entry</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={newEntry.name}
              name="name"
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Value"
              value={newEntry.value}
              name="value"
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Add Entry</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Data Entries</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Insights</h3>
        </CardHeader>
        <CardContent>
          <p>Total Entries: {calculateInsights()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MVP;