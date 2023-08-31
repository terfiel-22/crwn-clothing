import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import "./cart-item.styles";

const CartItem = ({ cartItem: { name, quantity, imageUrl, price } }) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
