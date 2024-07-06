import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/@/components/ui/card';
import { Input } from '../components/@/components/ui/input';
import { Button } from '../components/@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/@/components/ui/table';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyrjhndlnuukzjvakejb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cmpobmRsbnV1a3pqdmFrZWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDAzODAzNiwiZXhwIjoyMDM1NjE0MDM2fQ.czaK49w4oDqyo9hMSTiYCCr8q28s743x1woBlyQ5g3k';
const supabase = createClient(supabaseUrl, supabaseKey);

type DataEntry = {
  id: number;
  name: string;
  value: string;
  trade_name: number;
  rm_spec_no: string;
  us_inci_name: string;
  eu_inci_name: string;
  price_variance: string;
  lead_time: string;
  manufacturing_site: string;
  rm_volume: string;
};

const MVP = () => {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [newEntry, setNewEntry] = useState<DataEntry>({
    id: 0,
    name: '',
    value: '',
    trade_name: 0,
    rm_spec_no: '',
    us_inci_name: '',
    eu_inci_name: '',
    price_variance: '',
    lead_time: '',
    manufacturing_site: '',
    rm_volume: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('materials').select('*');
    if (error) console.error(error);
    else setDataEntries(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await supabase.from('materials').update(newEntry).eq('id', newEntry.id);
      setIsEditing(false);
    } else {
      const { data, error } = await supabase.from('materials').insert([{ ...newEntry, id: Date.now() }]);
      if (error) {
        console.error(error);
      } else if (data) {
        setDataEntries([...dataEntries, data[0]]);
      }
    }
  };

  const handleEdit = (entry: DataEntry) => {
    setNewEntry(entry);
    setIsEditing(true);
  };

  const handleImport = () => {
    // Placeholder for import logic
    console.log("Importing data...");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Materials Dashboard</h1>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Add New Material</h3>
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
            <Button type="submit">{isEditing ? 'Update Entry' : 'Add Entry'}</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Materials</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade name</TableHead>
                <TableHead>RM spec no.</TableHead>
                <TableHead>US INCI name</TableHead>
                <TableHead>EU INCI name</TableHead>
                <TableHead>Price variance %</TableHead>
                <TableHead>Pendulum lead time</TableHead>
                <TableHead>Pendulum manufacturing site considered</TableHead>
                <TableHead>RM volume in KG annual estimation</TableHead>
                <TableHead>RM price - BP 23 (per KG) file considered as at: 26 May 23</TableHead>
                <TableHead>Costing as per BP23</TableHead>
                <TableHead>BP23 Manufacturing site considered</TableHead>
                <TableHead>Sub category</TableHead>
                <TableHead>NA Source Manager</TableHead>
                <TableHead>Global category lead </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Material A</TableCell>
                <TableCell>Spec001</TableCell>
                <TableCell>INCI001</TableCell>
                <TableCell>EUINCI001</TableCell>
                <TableCell>5%</TableCell>
                <TableCell>10 days</TableCell>
                <TableCell>Site A</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>$50</TableCell>
                <TableCell>$50000</TableCell>
                <TableCell>Site A</TableCell>
                <TableCell>Category 1</TableCell>
                <TableCell>Manager A</TableCell>
                <TableCell>Lead A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Material B</TableCell>
                <TableCell>Spec002</TableCell>
                <TableCell>INCI002</TableCell>
                <TableCell>EUINCI002</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>15 days</TableCell>
                <TableCell>Site B</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>$60</TableCell>
                <TableCell>$120000</TableCell>
                <TableCell>Site B</TableCell>
                <TableCell>Category 2</TableCell>
                <TableCell>Manager B</TableCell>
                <TableCell>Lead B</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Material C</TableCell>
                <TableCell>Spec003</TableCell>
                <TableCell>INCI003</TableCell>
                <TableCell>EUINCI003</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>20 days</TableCell>
                <TableCell>Site C</TableCell>
                <TableCell>3000</TableCell>
                <TableCell>$70</TableCell>
                <TableCell>$210000</TableCell>
                <TableCell>Site C</TableCell>
                <TableCell>Category 3</TableCell>
                <TableCell>Manager C</TableCell>
                <TableCell>Lead C</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-medium">Insights</h3>
        </CardHeader>
        <CardContent>
          <p>Total Entries: {dataEntries.length}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MVP;