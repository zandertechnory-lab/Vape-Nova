import { Resend } from 'resend';
import { OrderStatus } from '../models/Order';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
    customerEmail: string;
    customerName: string;
    transactionId: string;
    orderItems: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    totalPrice: number;
    estimatedDelivery: Date;
}

interface StatusUpdateEmailData {
    customerEmail: string;
    customerName: string;
    transactionId: string;
    status: OrderStatus;
    trackingNumber?: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    try {
        const { customerEmail, customerName, transactionId, orderItems, totalPrice, estimatedDelivery } = data;

        const itemsList = orderItems
            .map(item => `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`)
            .join('');

        const formattedDate = estimatedDelivery.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        await resend.emails.send({
            from: 'VapeNova <orders@vapenova.com>',
            to: customerEmail,
            subject: `Order Confirmation - ${transactionId}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .transaction-id { background: #fff; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; font-size: 18px; font-weight: bold; }
              .order-items { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .order-items ul { list-style: none; padding: 0; }
              .order-items li { padding: 10px 0; border-bottom: 1px solid #eee; }
              .total { font-size: 20px; font-weight: bold; color: #667eea; text-align: right; margin-top: 15px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Order Confirmed!</h1>
                <p>Thank you for your order, ${customerName}!</p>
              </div>
              <div class="content">
                <div class="transaction-id">
                  📦 Transaction ID: ${transactionId}
                </div>
                <p>Your order has been received and is being processed. You can track your order status using the transaction ID above.</p>
                
                <div class="order-items">
                  <h3>Order Summary</h3>
                  <ul>
                    ${itemsList}
                  </ul>
                  <div class="total">Total: $${totalPrice.toFixed(2)}</div>
                </div>
                
                <p><strong>Estimated Delivery:</strong> ${formattedDate}</p>
                
                <a href="${process.env.NEXTAUTH_URL}/track-order?id=${transactionId}" class="button">
                  Track Your Order
                </a>
                
                <p>If you have any questions, please don't hesitate to contact us.</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} VapeNova. All rights reserved.</p>
                <p>This is an automated email. Please do not reply to this message.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return { success: false, error };
    }
}

/**
 * Send order status update email
 */
export async function sendStatusUpdateEmail(data: StatusUpdateEmailData) {
    try {
        const { customerEmail, customerName, transactionId, status, trackingNumber } = data;

        const statusMessages: Record<OrderStatus, { title: string; message: string; emoji: string }> = {
            'Pending': {
                title: 'Order Received',
                message: 'We have received your order and will begin processing it soon.',
                emoji: '⏳'
            },
            'Processing': {
                title: 'Order Processing',
                message: 'Your order is being prepared for shipment.',
                emoji: '📦'
            },
            'Shipped': {
                title: 'Order Shipped',
                message: 'Your order is on its way!',
                emoji: '🚚'
            },
            'Delivered': {
                title: 'Order Delivered',
                message: 'Your order has been delivered. Enjoy your purchase!',
                emoji: '✅'
            },
            'Cancelled': {
                title: 'Order Cancelled',
                message: 'Your order has been cancelled.',
                emoji: '❌'
            }
        };

        const statusInfo = statusMessages[status];
        const trackingInfo = trackingNumber
            ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>`
            : '';

        await resend.emails.send({
            from: 'VapeNova <orders@vapenova.com>',
            to: customerEmail,
            subject: `${statusInfo.emoji} Order Update - ${transactionId}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .status-badge { background: #667eea; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; font-weight: bold; }
              .transaction-id { background: #fff; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${statusInfo.emoji} ${statusInfo.title}</h1>
              </div>
              <div class="content">
                <p>Hello ${customerName},</p>
                <p>${statusInfo.message}</p>
                
                <div class="transaction-id">
                  Transaction ID: ${transactionId}
                </div>
                
                <div class="status-badge">${status}</div>
                
                ${trackingInfo}
                
                <a href="${process.env.NEXTAUTH_URL}/track-order?id=${transactionId}" class="button">
                  Track Your Order
                </a>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} VapeNova. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending status update email:', error);
        return { success: false, error };
    }
}
