import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.type";
import "./product-card.styles";
import { Footer, ProductCardContainer } from "./product-card.styles";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/categories.types";
import { FC } from "react";

type ProductCardProps = {
  product: CategoryItem;
};
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
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
