"use client";

import { OrderStatus, IStatusHistory } from "@/lib/models/Order";
import { CheckCircle2, Circle, Package, Truck, XCircle, Clock } from "lucide-react";

interface OrderStatusTimelineProps {
    currentStatus: OrderStatus;
    statusHistory: IStatusHistory[];
}

const statusSteps: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const statusIcons: Record<OrderStatus, any> = {
    'Pending': Clock,
    'Processing': Package,
    'Shipped': Truck,
    'Delivered': CheckCircle2,
    'Cancelled': XCircle,
};

const statusColors: Record<OrderStatus, string> = {
    'Pending': 'text-yellow-500',
    'Processing': 'text-blue-500',
    'Shipped': 'text-purple-500',
    'Delivered': 'text-green-500',
    'Cancelled': 'text-red-500',
};

export default function OrderStatusTimeline({ currentStatus, statusHistory }: OrderStatusTimelineProps) {
    // Handle cancelled status separately
    if (currentStatus === 'Cancelled') {
        const Icon = statusIcons['Cancelled'];
        const cancelledHistory = statusHistory.find(h => h.status === 'Cancelled');

        return (
            <div className="py-6">
                <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <Icon className="w-8 h-8 text-red-500" />
                    <div>
                        <h3 className="font-semibold text-red-700">Order Cancelled</h3>
                        {cancelledHistory && (
                            <p className="text-sm text-red-600">
                                {new Date(cancelledHistory.timestamp).toLocaleString()}
                            </p>
                        )}
                        {cancelledHistory?.note && (
                            <p className="text-sm text-red-600 mt-1">{cancelledHistory.note}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const currentStepIndex = statusSteps.indexOf(currentStatus);

    return (
        <div className="py-6">
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div
                    className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transition-all duration-500"
                    style={{
                        height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`
                    }}
                />

                {/* Status Steps */}
                <div className="space-y-8">
                    {statusSteps.map((step, index) => {
                        const Icon = statusIcons[step];
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = step === currentStatus;
                        const history = statusHistory.find(h => h.status === step);

                        return (
                            <div key={step} className="relative flex items-start gap-4">
                                {/* Icon */}
                                <div
                                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${isCompleted
                                            ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-purple-500'
                                            : 'bg-white border-gray-300'
                                        }`}
                                >
                                    <Icon
                                        className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-400'
                                            }`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-8">
                                    <div className={`font-semibold ${isCurrent ? statusColors[step] : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {step}
                                    </div>
                                    {history && (
                                        <div className="mt-1 text-sm text-gray-600">
                                            {new Date(history.timestamp).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    )}
                                    {history?.note && (
                                        <div className="mt-1 text-sm text-gray-500 italic">
                                            {history.note}
                                        </div>
                                    )}
                                    {isCurrent && !history && (
                                        <div className="mt-1 text-sm text-gray-500">
                                            In progress...
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
