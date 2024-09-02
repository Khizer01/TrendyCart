import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from '../../Api Requests/requestMethods';
import './success.css';
import { clearCart } from '../../store/cart/cartSlice';

export default function Success() {
    const [orderId, setOrderId] = useState(null);
    const location = useLocation();
    const session_id = new URLSearchParams(location.search).get('session_id');
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {  
        const fetchSessionData = async () => {
            if (!session_id) {
                console.error("No session ID found in the URL");
                return;
            }

            try {
                const session = await userRequest().get(`/checkout/session/${session_id}`);
                const customerDetails = session.data.customer_details;  
                const amountTotal = session.data.amount_total;  
                const lineItems = session.data.line_items?.data;  

                if (!lineItems || lineItems.length === 0) {
                    console.error("No line items found in the session data");
                    return;
                }
                
                const createOrder = async () => {
                    const res = await userRequest().post("/order", {
                        userId: currentUser._id,
                        products: lineItems.map(item => {
                            const product = cart.products.find(p => p._id === item.price.product); // Find product in cart
                            return {
                                productId: product ? product.title : item.price.product, // Use title from cart or fallback to product ID
                                quantity: item.quantity,
                            };
                        }),
                        amount: amountTotal / 100, // Convert amount from cents to dollars
                        address: customerDetails.address,
                    });
                    if (res.data && res.data._id) {
                        setOrderId(res.data._id);
                        dispatch(clearCart());
                    }
                };
                createOrder();
            } catch (err) {
                console.error("Error retrieving session data or creating order:", err.message);
            }
        };
        fetchSessionData();
    }, [session_id, currentUser, cart, dispatch]);

    return (
        <div className='success-container'>
            <div className="div">
                <p><i className="fas fa-check-circle"></i>
                {orderId
                    ? `Order has been created successfully. Your order number is ${orderId}`
                    : `Successful. Your order is being prepared...`}
                </p>
                <Link to='/' className='btn'>Go to Homepage</Link>
            </div>
        </div>
    );
}
