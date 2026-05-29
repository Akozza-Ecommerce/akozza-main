<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrescriptionRequest;
use App\Http\Resources\PrescriptionResource;
use App\Models\Customer;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prescriptions = PrescriptionResource::collection(Prescription::with('customer')->latest()->paginate(12)->withQueryString());
        return Inertia::render('prescriptions/index', [
            'prescriptions' => $prescriptions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('prescriptions/create', [
            'customers' => Customer::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PrescriptionRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id ?? 1;

        Prescription::create($data);

        return redirect()->route('prescriptions.index')->with('success', 'Prescription created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Prescription $prescription)
    {
        $prescription->load('customer');
        return Inertia::render('prescriptions/show', [
            'prescription' => new PrescriptionResource($prescription)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prescription $prescription)
    {
        return Inertia::render('prescriptions/edit', [
            'prescription' => new PrescriptionResource($prescription),
            'customers' => Customer::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PrescriptionRequest $request, Prescription $prescription)
    {
        $data = $request->validated();
        $prescription->update($data);

        return redirect()->route('prescriptions.index')->with('success', 'Prescription updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prescription $prescription)
    {
        $prescription->delete();

        return redirect()->route('prescriptions.index')->with('success', 'Prescription deleted successfully.');
    }
}
