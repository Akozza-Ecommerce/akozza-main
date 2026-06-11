<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $products = Product::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->with('category')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/products/index', [
            'products' => ProductResource::collection($products)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $categories = Category::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->active()
            ->latest()
            ->get();

        return inertia('vendor/products/create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $data['tenant_id'] = $request->user()->active_tenant_id;
        $data['store_id'] = $request->user()->active_store_id;

        Product::create($data);

        return to_route('vendor.products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('category');
        return inertia('vendor/products/show', [
            'product' => new ProductResource($product)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Product $product)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $categories = Category::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->active()
            ->latest()
            ->get();

        return inertia('vendor/products/edit', [
            'product' => new ProductResource($product),
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $product->update($data);

        return to_route('vendor.products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return to_route('vendor.products.index')->with('success', 'Product deleted successfully.');
    }
}
