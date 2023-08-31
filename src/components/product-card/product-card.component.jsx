import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles";
import { CartContext } from "../../context/cart.context";
import { Footer, ProductCardContainer } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        buttonOptions={{ onClick: addProductToCart }}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
