<?php
namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Prescription;
use App\Models\User;
use Illuminate\Database\Seeder;

class PrescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        if (!$user) {
            return;
        }

        $customers = Customer::all();
        if ($customers->isEmpty()) {
            return;
        }

        $prescriptions = [
            [
                'name' => 'Distance Prescription',
                'right_sph' => '-1.50',
                'right_cyl' => '-0.50',
                'right_axis' => '180',
                'right_distance_va' => '6/6',
                'right_add' => null,
                'right_near_va' => null,
                'left_sph' => '-1.25',
                'left_cyl' => '-0.75',
                'left_axis' => '175',
                'left_distance_va' => '6/6',
                'left_add' => null,
                'left_near_va' => null,
                'ipd_distance' => '64',
                'ipd_near' => null,
                'receipt_source' => 'Clinic A',
                'ipd_source' => 'Auto-Refractor',
            ],
            [
                'name' => 'Reading Glasses',
                'right_sph' => '+1.50',
                'right_cyl' => null,
                'right_axis' => null,
                'right_distance_va' => null,
                'right_add' => '+2.00',
                'right_near_va' => 'N5',
                'left_sph' => '+1.75',
                'left_cyl' => null,
                'left_axis' => null,
                'left_distance_va' => null,
                'left_add' => '+2.00',
                'left_near_va' => 'N5',
                'ipd_distance' => null,
                'ipd_near' => '60',
                'receipt_source' => 'Dr. Smith',
                'ipd_source' => 'Manual ruler',
            ],
            [
                'name' => 'Progressive Prescription',
                'right_sph' => '-0.75',
                'right_cyl' => '-1.25',
                'right_axis' => '90',
                'right_distance_va' => '6/5',
                'right_add' => '+1.75',
                'right_near_va' => 'N6',
                'left_sph' => '-0.50',
                'left_cyl' => '-1.00',
                'left_axis' => '85',
                'left_distance_va' => '6/5',
                'left_add' => '+1.75',
                'left_near_va' => 'N6',
                'ipd_distance' => '65',
                'ipd_near' => '62',
                'receipt_source' => 'Eye Care Center',
                'ipd_source' => 'Pupillometer',
            ],
        ];

        foreach ($customers as $index => $customer) {
            // Assign a prescription template to the customer
            $template = $prescriptions[$index % count($prescriptions)];
            $template['user_id'] = $user->id;
            $template['customer_id'] = $customer->id;
            
            Prescription::create($template);
        }
    }
}
