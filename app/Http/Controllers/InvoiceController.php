<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use App\Http\Resources\InvoiceResource;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function __construct(protected InvoiceService $invoiceService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = InvoiceResource::collection(Invoice::with(['customer', 'payments'])->latest()->paginate(12)->withQueryString());
        return Inertia::render('invoices/index', [
            'invoices' => $invoices
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InvoiceRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $this->invoiceService->createInvoice($validated);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'payments', 'payments.paymentMethod', 'coupon', 'order.items.product', 'user']);
        return Inertia::render('invoices/show', [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        // dd($request->all());
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $this->invoiceService->updateInvoice($invoice, $validated);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }
}
