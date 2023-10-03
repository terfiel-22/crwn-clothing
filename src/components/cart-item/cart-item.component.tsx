import { FC } from "react";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import "./cart-item.styles";
import { CartItem as CartItemType } from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: CartItemType;
};
const CartItem: FC<CartItemProps> = ({
  cartItem: { name, quantity, imageUrl, price },
}) => {
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
