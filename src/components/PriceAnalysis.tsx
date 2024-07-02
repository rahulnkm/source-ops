import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const mockMaterials = [
  { id: 1, name: 'Steel' },
  { id: 2, name: 'Aluminum' },
  { id: 3, name: 'Copper' },
];

const mockPriceData: { [key: number]: { date: string; price: number }[] } = {
  1: [
    { date: '2023-01', price: 100 },
    { date: '2023-02', price: 105 },
    { date: '2023-03', price: 103 },
    { date: '2023-04', price: 108 },
    { date: '2023-05', price: 110 },
    { date: '2023-06', price: 112 },
  ],
  2: [
    { date: '2023-01', price: 80 },
    { date: '2023-02', price: 82 },
    { date: '2023-03', price: 85 },
    { date: '2023-04', price: 83 },
    { date: '2023-05', price: 86 },
    { date: '2023-06', price: 88 },
  ],
  3: [
    { date: '2023-01', price: 150 },
    { date: '2023-02', price: 155 },
    { date: '2023-03', price: 153 },
    { date: '2023-04', price: 158 },
    { date: '2023-05', price: 160 },
    { date: '2023-06', price: 162 },
  ],
};

const PriceAnalysis = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(mockMaterials[0].id);

  const handleMaterialChange = (value: string) => {
    setSelectedMaterial(Number(value));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price Analysis</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Historical Price Changes</h3>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={handleMaterialChange} defaultValue={selectedMaterial.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a material" />
              </SelectTrigger>
              <SelectContent>
                {mockMaterials.map((material) => (
                  <SelectItem key={material.id} value={material.id.toString()}>
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockPriceData[selectedMaterial]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceAnalysis;