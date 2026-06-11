<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $categories = Category::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/categories/index', [
            'categories' => CategoryResource::collection($categories)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('vendor/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        $data['tenant_id'] = $request->user()->active_tenant_id;
        $data['store_id'] = $request->user()->active_store_id;

        Category::create($data);

        return to_route('vendor.categories.index')->with('success', 'Category Stored Successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('vendor/categories/show', [
            'category' => new CategoryResource($category)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('vendor/categories/edit', [
            'category' => new CategoryResource($category)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        $category->update($data);

        return to_route('vendor.categories.index')->with('success', 'Category Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('vendor.categories.index')->with('success', 'Category Deleted Successfully!');
    }
}
