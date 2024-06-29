import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

const MaterialManagement = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    supplier: '',
    lastPrice: '',
    targetPrice: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setMaterials(materials.map(m => m.id === editingId ? { ...newMaterial, id: editingId } : m));
      setEditingId(null);
    } else {
      setMaterials([...materials, { ...newMaterial, id: Date.now() }]);
    }
    setNewMaterial({ name: '', supplier: '', lastPrice: '', targetPrice: '', quantity: '' });
  };

  const handleEdit = (material) => {
    setNewMaterial(material);
    setEditingId(material.id);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Material Management</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Add New Material</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Material Name"
              value={newMaterial.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="supplier"
              placeholder="Supplier"
              value={newMaterial.supplier}
              onChange={handleInputChange}
              required
            />
            <Input
              name="lastPrice"
              type="number"
              placeholder="Last Price Paid"
              value={newMaterial.lastPrice}
              onChange={handleInputChange}
              required
            />
            <Input
              name="targetPrice"
              type="number"
              placeholder="Target Price"
              value={newMaterial.targetPrice}
              onChange={handleInputChange}
              required
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={newMaterial.quantity}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">{editingId !== null ? 'Update' : 'Add'} Material</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Materials List</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Price</TableHead>
                <TableHead>Target Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>${material.lastPrice}</TableCell>
                  <TableCell>${material.targetPrice}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => handleEdit(material)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" onClick={() => handleDelete(material.id)}><Trash2 className="h-4 w-4" /></Button>
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

export default MaterialManagement;