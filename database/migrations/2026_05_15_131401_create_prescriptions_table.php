<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->string('right_sph')->nullable();
            $table->string('right_cyl')->nullable();
            $table->string('right_distance_va')->nullable();
            $table->string('right_axis')->nullable();
            $table->string('right_add')->nullable();
            $table->string('right_near_va')->nullable();
            $table->string('left_sph')->nullable();
            $table->string('left_cyl')->nullable();
            $table->string('left_distance_va')->nullable();
            $table->string('left_axis')->nullable();
            $table->string('left_add')->nullable();
            $table->string('left_near_va')->nullable();
            $table->string('ipd_distance')->nullable();
            $table->string('ipd_near')->nullable();
            $table->string('receipt_source')->nullable();
            $table->string('ipd_source')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
