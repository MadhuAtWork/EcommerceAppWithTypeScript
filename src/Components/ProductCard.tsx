import { useDispatch } from "react-redux";
import { addToCart } from "./ReduxComponent/slices/cartSlice";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  title: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      title: product.title,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="product-card">
        <img src={product.image} alt={product.title} className="img-fluid" />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
