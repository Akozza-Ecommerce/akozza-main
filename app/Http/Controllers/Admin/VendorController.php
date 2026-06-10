<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Vendor\CreateVendorRequest;
use App\Http\Requests\Admin\Vendor\UpdateVendorRequest;
use App\Http\Resources\Admin\Vendor\VendorResource;
use App\Models\User;
use App\Policies\VendorPolicy;
use App\Services\Vendor\VendorService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected VendorService $vendorService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('admin.vendors.view');

        $vendors = User::vendors()->paginate(20);

        return inertia('admin/vendors/index', [
            'vendors' => VendorResource::collection($vendors),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin.vendors.create');

        return inertia('admin/vendors/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateVendorRequest $request)
    {
        $vendor = $this->vendorService->createVendor($request->validated());

        return to_route('admin.vendors.show', $vendor);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $vendor)
    {
        $this->authorize('admin.vendors.view');

        return inertia('admin/vendors/show', [
            'vendor' => $vendor
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $vendor)
    {
        $this->authorize('admin.vendors.edit');

        return inertia('admin/vendors/edit', [
            'vendor' => VendorResource::make($vendor)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVendorRequest $request, User $vendor)
    {
        $data = $request->validated();
        if ($request->has('password') && empty($request->input('password'))) {
            unset($data['password']);
        }
        $vendor = $this->vendorService->updateVendor($vendor, $data);

        return to_route('admin.vendors.show', $vendor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $vendor)
    {
        $this->authorize('admin.vendors.delete');

        $vendor->delete();

        return to_route('admin.vendors.index');
    }
}
