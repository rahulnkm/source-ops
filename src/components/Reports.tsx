import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/@/components/ui/select';
import { Button } from '../components/@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/@/components/ui/table';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const mockReportData: { [key: string]: { category: string; amount: number }[] } = {
  savings: [
    { category: 'Raw Materials', amount: 50000 },
    { category: 'Packaging', amount: 30000 },
    { category: 'Transportation', amount: 20000 },
    { category: 'Labor', amount: 10000 },
  ],
  costs: [
    { category: 'Raw Materials', amount: 200000 },
    { category: 'Packaging', amount: 100000 },
    { category: 'Transportation', amount: 80000 },
    { category: 'Labor', amount: 150000 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reports = () => {
  const [reportType, setReportType] = useState('savings');

  const handleReportTypeChange = (value: string) => {
    setReportType(value);
  };

  const data = mockReportData[reportType];
  const total = data.reduce((sum: number, item: { amount: number }) => sum + item.amount, 0);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Generate Report</h3>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-4">
            <Select onValueChange={handleReportTypeChange} defaultValue={reportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings Report</SelectItem>
                <SelectItem value="costs">Cost Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button>Generate PDF</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h4 className="text-md font-medium">Bar Chart</h4>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h4 className="text-md font-medium">Pie Chart</h4>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                      />
))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">${total.toLocaleString()}</TableCell>
                <TableCell className="font-bold">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;