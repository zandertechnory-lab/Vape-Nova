/**
 * Generate a unique transaction ID for orders
 * Format: VN-YYYYMMDD-XXXXX
 * Example: VN-20231215-A1B2C
 */
export function generateTransactionId(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Generate random alphanumeric string (5 characters)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    for (let i = 0; i < 5; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `VN-${year}${month}${day}-${randomStr}`;
}

/**
 * Calculate estimated delivery date based on order date
 * Default: 5-7 business days
 */
export function calculateEstimatedDelivery(orderDate: Date = new Date()): Date {
    const estimatedDays = 7; // 7 days for delivery
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
    return deliveryDate;
}

/**
 * Order status types
 */
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

/**
 * Get status color for UI
 */
export function getStatusColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
        'Pending': 'bg-yellow-500',
        'Processing': 'bg-blue-500',
        'Shipped': 'bg-purple-500',
        'Delivered': 'bg-green-500',
        'Cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
}

/**
 * Get status text color for UI
 */
export function getStatusTextColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
        'Pending': 'text-yellow-600',
        'Processing': 'text-blue-600',
        'Shipped': 'text-purple-600',
        'Delivered': 'text-green-600',
        'Cancelled': 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
}
