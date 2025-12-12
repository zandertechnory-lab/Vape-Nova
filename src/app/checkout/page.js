"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    // Redirect to sign in if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/signin?redirect=/checkout');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className={`container ${styles.page}`}>
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const shipping = subtotal >= 200 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const meetsMinimum = subtotal >= 200;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!meetsMinimum) {
            alert('Minimum order subtotal of $200 required');
            return;
        }
        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }
        // Generate Transaction ID
        const transactionId = `VF-${Math.floor(100000 + Math.random() * 900000)}`;

        // Simulate API call
        // await createOrder({ ...formData, paymentMethod, transactionId, cart, total });

        clearCart();
        router.push(`/checkout/success?id=${transactionId}&total=${total.toFixed(2)}`);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <h1 className={styles.title}>Checkout</h1>

            <div className={styles.grid}>
                {/* Order Summary */}
                <div className={styles.summary}>
                    <h2>Order Summary</h2>

                    {cart.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <p>Your cart is empty</p>
                            <Button variant="primary" onClick={() => router.push('/shop')}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.items}>
                                {cart.map(item => (
                                    <div key={item.id} className={styles.item}>
                                        {item.image && (
                                            <div className={styles.itemImage}>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        )}
                                        <div className={styles.itemInfo}>
                                            <h3>{item.name}</h3>
                                            <p className={styles.itemPrice}>${item.price}</p>

                                            <div className={styles.quantityControl}>
                                                <button
                                                    className={styles.quantityBtn}
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className={styles.quantity}>{item.quantity}</span>
                                                <button
                                                    className={styles.quantityBtn}
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <p className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeFromCart(item.id)}
                                                title="Remove from cart"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.totals}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Shipping:</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Tax (8%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {!meetsMinimum && (
                                <div className={styles.minimumWarning}>
                                    <p>⚠️ Minimum order subtotal of $200 required</p>
                                    <p className={styles.remaining}>
                                        Add ${(200 - subtotal).toFixed(2)} more to checkout
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Shipping Form */}
                {cart.length > 0 && (
                    <div className={styles.form}>
                        <h2>Shipping Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <Input
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                            <div className={styles.formRow}>
                                <Input
                                    label="City"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                />
                                <Input
                                    label="State"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    required
                                />
                                <Input
                                    label="ZIP Code"
                                    value={formData.zip}
                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.paymentSection}>
                                <h2>Payment Method</h2>
                                <div className={styles.paymentOptions}>
                                    <label className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.selected : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>PayPal</span>
                                            <span className={styles.paymentDesc}>Pay via PayPal</span>
                                        </div>
                                    </label>

                                    <label className={`${styles.paymentOption} ${paymentMethod === 'payid' ? styles.selected : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="payid"
                                            checked={paymentMethod === 'payid'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>PayID</span>
                                            <span className={styles.paymentDesc}>Fast bank transfer</span>
                                        </div>
                                    </label>

                                    <label className={`${styles.paymentOption} ${paymentMethod === 'bank_transfer' ? styles.selected : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bank_transfer"
                                            checked={paymentMethod === 'bank_transfer'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>Bank Transfer</span>
                                            <span className={styles.paymentDesc}>Direct bank deposit</span>
                                        </div>
                                    </label>

                                    <label className={`${styles.paymentOption} ${paymentMethod === 'revolut' ? styles.selected : ''}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="revolut"
                                            checked={paymentMethod === 'revolut'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>Revolut</span>
                                            <span className={styles.paymentDesc}>Pay via Revolut</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                disabled={!meetsMinimum}
                            >
                                Place Order - ${total.toFixed(2)}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
