<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vendor\Store\CreateStoreRequest;
use App\Http\Requests\Vendor\Store\UpdateStoreRequest;
use App\Http\Resources\Vendor\Store\StoreResource;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $stores = $request->user()->ownedTenant?->stores()->latest()->paginate(20)->withQueryString();

        return inertia('vendor/stores/index', [
            'stores' => StoreResource::collection($stores),
        ]);
    }

    public function create()
    {
        return inertia('vendor/stores/create');
    }

    public function store(CreateStoreRequest $request)
    {
        $store = Store::create(array_merge(
            $request->validated(),
            ['tenant_id' => $request->user()->ownedTenant->getKey()]
        ));

        return to_route('vendor.stores.show', $store);
    }

    public function show(Store $store)
    {
        return inertia('vendor/stores/show', [
            'store' => StoreResource::make($store),
        ]);
    }

    public function edit(Store $store)
    {
        return inertia('vendor/stores/edit', [
            'store' => StoreResource::make($store),
        ]);
    }

    public function update(UpdateStoreRequest $request, Store $store)
    {
        $store->update($request->validated());

        return to_route('vendor.stores.show', $store);
    }

    public function destroy(Store $store)
    {
        Store::destroy($store->getKey());

        return to_route('vendor.stores.index');
    }
}
