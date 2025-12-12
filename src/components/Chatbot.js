"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './Chatbot.module.css';

const botResponses = {
    greeting: "Hi! 👋 I'm VapeBot, your vaping assistant. How can I help you today?",
    shipping: "We offer free shipping on orders over $200! Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee.",
    warranty: "All our vaporizers come with a full 2-year manufacturer warranty. Some premium models include extended warranties.",
    authentic: "Yes! We're an authorized retailer and all products come directly from manufacturers with full warranties. 100% authentic, guaranteed.",
    payment: "We accept all major credit cards, PayPal, and other secure payment methods. All transactions are SSL encrypted.",
    returns: "We have a 30-day return policy. Items must be unused and in original packaging. Contact our support team to initiate a return.",
    purchase: "To purchase:\n1. Browse our shop and select a product\n2. Click 'Add to Cart'\n3. Review your cart\n4. Proceed to checkout\n5. Enter shipping and payment info\n6. Complete your order!\n\nIt's that simple! Need help finding a specific product?",
    about: "VapeNova is your premier destination for authentic, high-quality vaporizers! We're an authorized retailer of top brands like Storz & Bickel, PAX, DynaVap, and Arizer. We offer:\n\n✨ 100% authentic products\n🛡️ 2-year warranties\n🚚 Free shipping over $200\n💳 Secure payments\n🌟 Expert support 24/7\n\nOur mission is to provide the best vaping experience with premium products and unmatched service!",
    thanks: "You're very welcome! 😊 Is there anything else I can help you with?",
    goodbye: "Happy vaping! Feel free to come back if you have more questions. Have a great day! 👋",
    help: "I can help you with:\n• Shipping information\n• Warranty details\n• Product authenticity\n• Payment methods\n• Returns & refunds\n• How to purchase\n• About VapeNova\n• General questions",
    default: "I'm not sure about that. Please contact our support team at support@vapenova.com or call us at 1-800-VAPENOVA for personalized assistance!"
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: botResponses.greeting, sender: 'bot', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();

        // Thank you - check first for politeness
        if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
            return botResponses.thanks;
        }

        // Goodbye
        if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('later')) {
            return botResponses.goodbye;
        }

        // Purchase/Order/Buy
        if (msg.includes('purchase') || msg.includes('buy') || msg.includes('order') || msg.includes('how do i') || msg.includes('how to get')) {
            return botResponses.purchase;
        }

        // Shipping related
        if (msg.includes('ship') || msg.includes('deliver') || msg.includes('track') || msg.includes('when will')) {
            return botResponses.shipping;
        }

        // Warranty related
        if (msg.includes('warrant') || msg.includes('guarantee') || msg.includes('cover')) {
            return botResponses.warranty;
        }

        // Authenticity related
        if (msg.includes('authentic') || msg.includes('real') || msg.includes('fake') || msg.includes('genuine') || msg.includes('legit')) {
            return botResponses.authentic;
        }

        // Payment related
        if (msg.includes('pay') || msg.includes('credit') || msg.includes('card') || msg.includes('checkout') || msg.includes('price')) {
            return botResponses.payment;
        }

        // Returns related
        if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange') || msg.includes('cancel')) {
            return botResponses.returns;
        }

        // Greeting or help
        if (msg.includes('help') || msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('what can')) {
            return botResponses.help;
        }

        // About the site
        if (msg.includes('about') || msg.includes('tell me more') || msg.includes('who are you') || msg.includes('what is') || msg.includes('your site') || msg.includes('this site')) {
            return botResponses.about;
        }

        // Product questions
        if (msg.includes('product') || msg.includes('device') || msg.includes('vape') || msg.includes('recommend')) {
            return "We carry premium vaporizers from top brands like Storz & Bickel, PAX, DynaVap, and Arizer. Browse our shop to see all products, or tell me what you're looking for and I can help guide you!";
        }

        // Contact
        if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('call')) {
            return "You can reach us at:\n📧 Email: support@vapenova.com\n📞 Phone: 1-800-VAPENOVA\n💬 Or continue chatting here!";
        }

        // Hours
        if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('time')) {
            return "Our customer support is available 24/7! Feel free to reach out anytime via email or this chat.";
        }

        return botResponses.default;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        setTimeout(() => {
            const botMessage = { text: getBotResponse(input), sender: 'bot', timestamp: new Date() };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <button
                className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
            >
                <MessageCircle size={24} />
            </button>

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <div className={styles.headerInfo}>
                            <MessageCircle size={20} />
                            <div>
                                <h3>VapeBot</h3>
                                <span className={styles.status}>Online</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className={styles.messages}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
                                <div className={styles.bubble}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className={styles.input}
                            suppressHydrationWarning
                        />
                        <button onClick={handleSend} className={styles.sendBtn}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
