import { useEffect, useState } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeProduct, addProducts } from '../../store/cart/cartSlice';
import { Link } from 'react-router-dom';
import { userRequest } from '../../Api Requests/requestMethods';

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.user.currentUser);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const calculate = () => {
    let totalAmount = 0;
    if (cart.totalPrice && typeof cart.totalPrice === 'number') {
      let taxPrice = cart.totalPrice * (5 / 100);
      totalAmount = cart.totalPrice + taxPrice + 5.90;
    }
    setTotalAmount(Number(totalAmount).toFixed(2));
  };
  
  useEffect(() => {
    calculate();
  }, [cart.totalPrice]);

  const handleCheckout = async () => {
    try {
      const res = await userRequest().post("/checkout/create-checkout-session", {
        cartItems: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        userId: currentUser._id, 
        totalAmount: totalAmount * 100, 
      });
  
      window.location.href = res.data.url; 
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = (product) => {
    dispatch(addProducts(product));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="cart-screen">
      <div className="Wrapper">
        <div className="Title">Your Trendy Cart</div>
        <div className="Top">
          <Link to="/products" className="TopButton">
            CONTINUE SHOPPING
          </Link>
          <div className="TopTexts">
            <div className="TopText">Shopping Bag({cart.totalQuantity})</div>
            <div className="TopText">Your Wishlist (0)</div>
          </div>
          <div
            className="TopButton"
            type="filled"
            onClick={() => dispatch(clearCart())}
          >
            CLEAR CART
          </div>
        </div>
        <div className="Bottom">
          <div className="Info">
            {cart.products.length === 0 ? (
              <div className="emptyCart">
                <h1>
                  Cart is Empty <i className="fa-solid fa-cart-shopping"></i>
                </h1>
              </div>
            ) : (
              cart.products.map((product) => (
                <div key={product._id}>
                  <div className="Product">
                    <div className="ProductDetail">
                      <img src={product.image} alt={product.title} />
                      <div className="Details">
                        <div className="ProductName">
                          <b>Product:</b> {product.title}
                        </div>
                        <div className="ProductId">
                          <b>ID:</b> {product._id}
                        </div>
                        <div className="ProductColor" color="black" />
                        <div className="ProductSize">
                          <b>Size:</b> {product.size}
                        </div>
                      </div>
                    </div>
                    <div className="PriceDetail">
                      <div className="ProductAmountContainer">
                        <i
                          className={`fa-solid fa-${
                            product.quantity > 1 ? "minus" : "trash"
                          }`}
                          onClick={() => handleRemoveProduct(product._id)}
                        ></i>
                        <div className="ProductAmount">{product.quantity}</div>
                        <i
                          className="fa-solid fa-plus"
                          onClick={() => handleAddProduct(product)}
                        ></i>
                      </div>
                      <div className="ProductPrice">
                        $ {(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
          {cart.products.length !== 0 && (
            <div className="Summary">
              <div className="SummaryTitle">ORDER SUMMARY</div>
              <div className="SummaryItem">
                <div className="SummaryItemText">Subtotal</div>
                <div className="SummaryItemPrice">
                  $ {Number(cart.totalPrice).toFixed(2)}
                </div>
              </div>
              <div className="SummaryItem">
                <div className="SummaryItemText">Estimated Shipping</div>
                <div className="SummaryItemPrice">$ 5.90</div>
              </div>
              <div className="SummaryItem">
                <div className="SummaryItemText">Product Tax</div>
                <div className="SummaryItemPrice">5 %</div>
              </div>
              <div className="SummaryItem" type="total">
                <div className="SummaryItemText">Total</div>
                <div className="SummaryItemPrice">$ {totalAmount}</div>
              </div>
              <button onClick={handleCheckout}>CHECKOUT NOW</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
