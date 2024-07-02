import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Trash2 } from 'lucide-react';

type Alert = {
  id: number;
  type: string;
  condition: string;
  material: string;
  active: boolean;
};

const AlertSettings = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Price Change', condition: '> 5%', material: 'Steel', active: true },
    { id: 2, type: 'Savings Opportunity', condition: '> $1000', material: 'All', active: true },
    { id: 3, type: 'Stock Level', condition: '< 100 units', material: 'Aluminum', active: false },
  ]);

  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id'>>({
    type: '',
    condition: '',
    material: '',
    active: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAlert(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewAlert(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlerts([...alerts, { ...newAlert, id: Date.now() }]);
    setNewAlert({ type: '', condition: '', material: '', active: true });
  };

  const handleDelete = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Alert Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Create New Alert</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              name="type"
              onValueChange={(value) => handleSelectChange('type', value)}
              value={newAlert.type}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select alert type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Price Change">Price Change</SelectItem>
                <SelectItem value="Savings Opportunity">Savings Opportunity</SelectItem>
                <SelectItem value="Stock Level">Stock Level</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Condition (e.g., > 5%, < 100 units)"
              value={newAlert.condition}
              name="condition"
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Material (or 'All')"
              value={newAlert.material}
              name="material"
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Add Alert</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Current Alerts</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.condition}</TableCell>
                  <TableCell>{alert.material}</TableCell>
                  <TableCell>
                    <Switch
                      checked={alert.active}
                      onCheckedChange={() => handleSwitchChange(alert.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => handleDelete(alert.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertSettings;