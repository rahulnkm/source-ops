import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './@/components/ui/card';
import { Input } from './@/components/ui/input';
import { Button } from './@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyrjhndlnuukzjvakejb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cmpobmRsbnV1a3pqdmFrZWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDAzODAzNiwiZXhwIjoyMDM1NjE0MDM2fQ.czaK49w4oDqyo9hMSTiYCCr8q28s743x1woBlyQ5g3k';
const supabase = createClient(supabaseUrl, supabaseKey);

type Material = {
  id: number;
  name: string;
  supplier: string;
  lastPrice: string;
  targetPrice: string;
  quantity: string;
};

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<Material>({
    id: 0,
    name: '',
    supplier: '',
    lastPrice: '',
    targetPrice: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data, error } = await supabase.from('materials').select('*');
    if (error) console.error(error);
    else setMaterials(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, supplier, lastPrice, targetPrice, quantity } = newMaterial;
    if (!name || !supplier) return false;
    if (!/^\d+(\.\d{1,2})?$/.test(lastPrice)) return false;
    if (!/^\d+(\.\d{1,2})?$/.test(targetPrice)) return false;
    if (!/^\d+$/.test(quantity)) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      await supabase.from('materials').update(newMaterial).eq('id', editingId);
      setEditingId(null);
    } else {
      const { data, error } = await supabase.from('materials').insert([{ ...newMaterial, id: Date.now() }]);
      if (error) {
        console.error(error);
      } else if (data) {
        setMaterials([...materials, data[0]]);
      }
    }
    setNewMaterial({ id: 0, name: '', supplier: '', lastPrice: '', targetPrice: '', quantity: '' });
    fetchMaterials();
  };

  const handleEdit = (material: Material) => {
    setNewMaterial(material);
    setEditingId(material.id);
  };

  const handleDelete = async (id: number) => {
    await supabase.from('materials').delete().eq('id', id);
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Materials</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Add New Material</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Material Name"
              value={newMaterial.name}
              name="name"
              onChange={handleInputChange}
              required
              pattern="[A-Za-z\s]+"
            />
            <Input
              placeholder="Supplier"
              value={newMaterial.supplier}
              name="supplier"
              onChange={handleInputChange}
              required
              pattern="[A-Za-z\s]+"
            />
            <Input
              placeholder="Last Price Paid"
              value={newMaterial.lastPrice}
              name="lastPrice"
              onChange={handleInputChange}
              required
              pattern="^\d+(\.\d{1,2})?$"
            />
            <Input
              placeholder="Target Price"
              value={newMaterial.targetPrice}
              name="targetPrice"
              onChange={handleInputChange}
              required
              pattern="^\d+(\.\d{1,2})?$"
            />
            <Input
              placeholder="Quantity"
              value={newMaterial.quantity}
              name="quantity"
              onChange={handleInputChange}
              required
              pattern="^\d+$"
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

export default Materials;