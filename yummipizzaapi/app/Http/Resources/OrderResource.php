<?php

namespace App\Http\Resources;

use App\OrderDetail;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'address' => $this->address,
            'phone' => $this->phone,
            'delivery_expense' => $this->delivery_expense,
            'orderDetails' => OrderDetailResource::collection($this->orderDetails),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
