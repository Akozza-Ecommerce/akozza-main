<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tenant\CreateTenantRequest;
use App\Http\Requests\Admin\Tenant\UpdateTenantRequest;
use App\Http\Resources\Admin\Tenant\TenantResource;
use App\Models\Tenant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TenantController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('admin.tenants.view');

        $tenants = Tenant::with('owner')->paginate(20);

        return inertia('admin/tenants/index', [
            'tenants' => TenantResource::collection($tenants),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin.tenants.create');

        $owners = 
            \App\Models\User::vendors()
                ->whereNotIn('id', Tenant::select('owner_id'))
                ->orderBy('name')
                ->get(['id', 'name']);

        return inertia('admin/tenants/create', [
            'owners' => $owners,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTenantRequest $request)
    {
        $tenant = Tenant::create($request->validated());

        return to_route('admin.tenants.show', $tenant->getKey());
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        $this->authorize('admin.tenants.view');

        return inertia('admin/tenants/show', [
            'tenant' => $tenant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant)
    {
        $this->authorize('admin.tenants.edit');

        return inertia('admin/tenants/edit', [
            'tenant' => TenantResource::make($tenant->load('owner')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $tenant->update($request->validated());

        return to_route('admin.tenants.show', $tenant->getKey());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        $this->authorize('admin.tenants.delete');

        Tenant::destroy($tenant->getKey());

        return to_route('admin.tenants.index');
    }
}
