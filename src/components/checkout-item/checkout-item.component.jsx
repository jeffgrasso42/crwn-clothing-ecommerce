import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { CheckoutItemContainer, ImageContainer, QuantityContainer, ArrowContainer, ValueContainer, RemoveButton } from './checkout-item.styles.jsx'

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className='name'> {name} </span>
      <QuantityContainer>
        <ArrowContainer onClick={removeItemHandler}>
          &#10094;
        </ArrowContainer>
        <ValueContainer>
          {quantity}
        </ValueContainer>
        <ArrowContainer onClick={addItemHandler}>
          &#10095;
        </ArrowContainer>
      </QuantityContainer>
      <span className='price'>{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem