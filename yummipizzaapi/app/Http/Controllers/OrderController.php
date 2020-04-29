<?php

namespace App\Http\Controllers;

use App\Order;
use App\Http\Resources\OrderResource;
use App\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $orders = Order::orderBy('id', 'desc');
        if ($request->email) {
            $orders->where('email', $request->email);
        }
        return OrderResource::collection($orders->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order();
        $order->name = $request->name;
        $order->email = $request->email;
        $order->address = $request->address;
        $order->phone = $request->phone;
        $order->delivery_expense = $request->deliveryExpense;
        if ($order->save()) {
            foreach ($request->orderDetails as $product) {
                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order->id;
                $orderDetail->product_id = $product['productId'];
                $orderDetail->quantity = $product['quantity'];
                $orderDetail->price = $product['price'];
                $orderDetail->save();
            }
        }

        return response()->json(['success' => true, 'message' => 'Successfully placed order.', 'last_insert_id' => $order->id], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id);
        $order->products = OrderDetail::where('order_id', $id)->get();
        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
