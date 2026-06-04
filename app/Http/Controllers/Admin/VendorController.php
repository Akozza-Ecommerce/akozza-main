<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Policies\VendorPolicy;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize([VendorPolicy::class, 'viewAny'], User::class);

        $vendors = User::vendors()->get();

        return inertia('admin/vendors/index', compact('vendors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize([VendorPolicy::class, 'create'], User::class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize([VendorPolicy::class, 'create'], User::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $this->authorize([VendorPolicy::class, 'view'], $user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $this->authorize([VendorPolicy::class, 'update'], $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $this->authorize([VendorPolicy::class, 'update'], $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->authorize([VendorPolicy::class, 'delete'], $user);
    }
}
