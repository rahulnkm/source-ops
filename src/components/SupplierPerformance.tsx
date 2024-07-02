import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../@/components/ui/select';
import { StarIcon } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const mockSuppliers = [
  { 
    id: 1, 
    name: 'Acme Corp', 
    metrics: {
      priceConsistency: 4,
      qualityRating: 5,
      deliveryReliability: 3,
      communication: 4,
      flexibility: 4
    }
  },
  { 
    id: 2, 
    name: 'Global Supplies Inc', 
    metrics: {
      priceConsistency: 3,
      qualityRating: 4,
      deliveryReliability: 5,
      communication: 3,
      flexibility: 3
    }
  },
  { 
    id: 3, 
    name: 'Best Materials Ltd', 
    metrics: {
      priceConsistency: 5,
      qualityRating: 3,
      deliveryReliability: 4,
      communication: 5,
      flexibility: 4
    }
  }
];

const SupplierPerformance = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(mockSuppliers[0]);

  const handleSupplierChange = (value: string) => {
    const supplier = mockSuppliers.find(s => s.id === parseInt(value));
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const renderStarRating = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const radarData = Object.entries(selectedSupplier.metrics).map(([key, value]) => ({
    subject: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    A: value,
    fullMark: 5
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier Performance</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Select Supplier</h3>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleSupplierChange} defaultValue={selectedSupplier.id.toString()}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              {mockSuppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Performance Metrics</h3>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(selectedSupplier.metrics).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                    <TableCell className="flex items-center">
                      {renderStarRating(value)}
                      <span className="ml-2">({value}/5)</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Performance Radar</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name={selectedSupplier.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierPerformance;