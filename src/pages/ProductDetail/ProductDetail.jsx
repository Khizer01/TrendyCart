import { useLocation } from "react-router-dom";
import "./productDetail.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "../../store/cart/cartSlice";
import { userRequest } from "../../Api Requests/requestMethods";
export default function ProductDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },[location]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest().get(
          "/product/find/" + (id ? id : "")
        );
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    type === "dec"
      ? quantity > 1 && setQuantity(quantity - 1)
      : setQuantity(quantity + 1);
  };

  const addToCart = () => {
    dispatch(addProducts({ ...product, color, size, quantity }));
  };

  return (
    <div className="product-detail">
      {Loading ? (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      ) : !Loading && product && product._id ? (
        <div className="wrapper">
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="info">
            <h1 className="title">{product.title}</h1>
            <p className="desc">{product.desc}</p>
            <div className="contain">
              {" "}
              <span className="price">${product.price}</span>{" "}
              <span className="wishlist">
                <i className="fa-regular fa-heart"></i> ADD TO WISHLIST
              </span>
            </div>

            <div className="filtercontainer">
              <div className="filter">
                <span className="filterTitle">Color:</span>
                <div className="colorOptions">
                  {product.color &&
                    product.color.length > 0 &&
                    product.color.map((color) => (
                      <div
                        className="filterColor"
                        style={{ backgroundColor: color }}
                        key={color}
                        onClick={() => setColor(color)}
                      ></div>
                    ))}
                </div>
              </div>
              <div className="filter">
                <span className="filterTitle">Size:</span>
                <select
                  className="filterSize"
                  onChange={(e) => setSize(e.target.value)}
                  defaultValue=""
                >
                  <option className="sizeOpt" value="" disabled>
                    Size
                  </option>
                  {product.size &&
                    product.size.length > 1 &&
                    product.size.map((size) => (
                      <option className="sizeOpt" key={size}>
                        {size.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="addContainer">
              <div className="amountContainer">
                <i
                  className="fa-solid fa-minus"
                  onClick={() => handleQuantity("dec")}
                ></i>
                <span className="amount">{quantity}</span>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => handleQuantity("inc")}
                ></i>
              </div>
              <button className="addToCartButton" onClick={addToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fetchingError">
          <h1>
            Product not found <i className="fa-solid fa-circle-exclamation"></i>
          </h1>
        </div>
      )}
    </div>
  );
}
