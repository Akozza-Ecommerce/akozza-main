import { FormField } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { index } from '@/routes/admin/tenants';
import { Link } from '@inertiajs/react';

interface TenantFormProps {
  data: any;
  setData: any;
  errors: any;
  processing: any;
  submit: any;
  owners?: { id: number; name: string }[];
  ownerName?: string;
}

export default function TenantForm({
  data,
  setData,
  errors,
  processing,
  submit,
  owners,
  ownerName,
}: TenantFormProps) {
  return (
    <form onSubmit={submit} className="space-y-6">
      <FormField id="name" label="Tenant Name" error={errors.name}>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          required
        />
      </FormField>

      <FormField id="owner_id" label="Tenant Owner" error={errors.owner_id}>
        {owners ? (
          <Select
            value={data.owner_id ? data.owner_id.toString() : ''}
            onValueChange={(value) => setData('owner_id', parseInt(value, 10))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a vendor owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner.id} value={owner.id.toString()}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="owner_id"
            value={ownerName ?? data.owner_id?.toString() ?? ''}
            disabled
          />
        )}
      </FormField>

      <div className="flex gap-4">
        <Button type="submit" disabled={processing}>
          {processing ? 'Saving...' : 'Save Tenant'}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href={index()}>Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
