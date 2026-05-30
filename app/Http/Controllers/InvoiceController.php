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
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'payments', 'payments.paymentMethod', 'coupon', 'order.items.product', 'user']);
        return Inertia::render('invoices/show', [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }
}
