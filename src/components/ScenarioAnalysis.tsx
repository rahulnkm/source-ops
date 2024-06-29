import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const mockMaterials = [
  { id: 1, name: 'Steel', currentPrice: 100, currentQuantity: 1000 },
  { id: 2, name: 'Aluminum', currentPrice: 80, currentQuantity: 1500 },
  { id: 3, name: 'Copper', currentPrice: 150, currentQuantity: 500 },
];

const ScenarioAnalysis = () => {
  const [scenarios, setScenarios] = useState([]);
  const [newScenario, setNewScenario] = useState({
    name: '',
    materials: mockMaterials.map(m => ({ ...m, newPrice: m.currentPrice, newQuantity: m.currentQuantity }))
  });

  const handleInputChange = (e, materialId) => {
    const { name, value } = e.target;
    setNewScenario(prev => ({
      ...prev,
      materials: prev.materials.map(m =>
        m.id === materialId ? { ...m, [name]: parseFloat(value) || 0 } : m
      )
    }));
  };

  const handleScenarioNameChange = (e) => {
    setNewScenario(prev => ({ ...prev, name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCostChange = newScenario.materials.reduce((acc, m) => {
      const oldCost = m.currentPrice * m.currentQuantity;
      const newCost = m.newPrice * m.newQuantity;
      return acc + (newCost - oldCost);
    }, 0);

    setScenarios([...scenarios, { ...newScenario, totalCostChange }]);
    setNewScenario({
      name: '',
      materials: mockMaterials.map(m => ({ ...m, newPrice: m.currentPrice, newQuantity: m.currentQuantity }))
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scenario Analysis</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Create New Scenario</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Scenario Name"
              value={newScenario.name}
              onChange={handleScenarioNameChange}
              required
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>New Price</TableHead>
                  <TableHead>Current Quantity</TableHead>
                  <TableHead>New Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newScenario.materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>${material.currentPrice}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        name="newPrice"
                        value={material.newPrice}
                        onChange={(e) => handleInputChange(e, material.id)}
                        required
                      />
                    </TableCell>
                    <TableCell>{material.currentQuantity}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        name="newQuantity"
                        value={material.newQuantity}
                        onChange={(e) => handleInputChange(e, material.id)}
                        required
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="submit">Add Scenario</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Scenario Results</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scenarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalCostChange" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Scenario Name</TableHead>
                <TableHead>Total Cost Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario, index) => (
                <TableRow key={index}>
                  <TableCell>{scenario.name}</TableCell>
                  <TableCell>${scenario.totalCostChange.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioAnalysis;