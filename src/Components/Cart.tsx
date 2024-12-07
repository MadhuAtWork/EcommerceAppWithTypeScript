import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./ReduxComponent/store";
import {
  updateQuantity,
  removeFromCart,
} from "./ReduxComponent/slices/cartSlice";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  title: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);

  const total = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center header text-white p-3">
        <h2 className="m-0">E-Commerce App</h2>
        <button
          className="btn btn-info"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i className="fas fa-shopping-cart cart-icon"></i>{" "}
          <span className="badge badge-warning ">{cartItemCount}</span>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasScrollingLabel">Shopping Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="row">
                {cart.map((item) => (
                  <div key={item.id} className="col-md-12 col-lg-12 mb-12">
                    <div className="card shadow-sm border-light rounded">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={(item as any).image || "fallback-image.jpg"}
                            alt={(item as any).title || "Default Title"}
                            className="img-fluid rounded-start"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {(item as any).title || "Default Title"}
                            </h5>
                            <p className="card-text">
                              ${item.price} x {item.quantity}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleDecreaseQuantity(item)}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  value={item.quantity}
                                  className="form-control w-50 mx-2 text-center"
                                  readOnly
                                />
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => handleIncreaseQuantity(item)}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                              >
                                Remove
                              </button>
                            </div>

                            <p className="mt-2">
                              <strong>
                                Total: $
                                {(item.price * item.quantity).toFixed(2)}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-4">
                <h4>Total: ${total}</h4>
                <button className="btn btn-success">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
