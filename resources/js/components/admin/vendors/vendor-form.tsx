import { FormField } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { index } from '@/routes/admin/vendors';
import { Link } from '@inertiajs/react';

interface VendorFormProps {
  data: any;
  setData: any;
  errors: any;
  processing: any;
  submit: any;
}

export default function VendorForm({ data, setData, errors, processing, submit }: VendorFormProps) {
  return (
    <form onSubmit={submit} className="space-y-6">
                <FormField id="name" label="Vendor Name" error={errors.name}>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </FormField>

                <FormField id="email" label="Email Address" error={errors.email}>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="password" label="New Password" error={errors.password}>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Leave blank to keep current password"
                        />
                    </FormField>

                    <FormField
                        id="password_confirmation"
                        label="Confirm New Password"
                        error={errors.password_confirmation}
                    >
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Repeat the new password"
                        />
                    </FormField>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Vendor'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href={index()}>Cancel</Link>
                    </Button>
                </div>
            </form>
  )
}
