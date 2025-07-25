//CartContainer.js
import React from 'react';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {clearCart} from '../features/cart/cartSlice';

const CartContainer = () => {
    const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  console.log('cartItems:', cartItems);

  if (false) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={()=>dispatch(clearCart())}>clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;
//EOF