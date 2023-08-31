import { useContext } from "react";
import "./cart-icon.styles";
import { CartContext } from "../../context/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import ShoppingSvg from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon src={ShoppingSvg} alt="ShoppingSvg" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
