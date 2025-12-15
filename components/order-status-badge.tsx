import { OrderStatus } from "@/lib/models/Order";
import { getStatusColor, getStatusTextColor } from "@/lib/utils/order-utils";

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export default function OrderStatusBadge({ status, className = "" }: OrderStatusBadgeProps) {
    const bgColor = getStatusColor(status);
    const textColor = getStatusTextColor(status);

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
            style={{
                backgroundColor: bgColor.replace('bg-', ''),
                color: 'white'
            }}
        >
            {status}
        </span>
    );
}
