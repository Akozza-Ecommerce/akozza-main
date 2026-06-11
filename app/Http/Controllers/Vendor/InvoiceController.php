<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Http\Resources\InvoiceResource;
use App\Services\InvoiceService;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(protected InvoiceService $invoiceService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $invoices = Invoice::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->with(['customer', 'payments'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/invoices/index', [
            'invoices' => InvoiceResource::collection($invoices)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'payments', 'payments.paymentMethod', 'coupon', 'order.items.product', 'user']);
        return inertia('vendor/invoices/show', [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }
}
