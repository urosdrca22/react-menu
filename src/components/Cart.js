import React, { useContext } from 'react';
import CartContext from '../store/cart-context';
import './Cart.css'
import CartItem from './CartItem';
import CartModal from './CartModal'

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItems =
        <ul className='cart-items'>
            {cartCtx.items.map((item) => (
                <CartItem  key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}
        </ul>;

    return (
        <CartModal onClose={props.onClose}>
            {cartItems}
            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className='actions'>
                <button className='button--alt' onClick={props.onClose}>Close</button>
                {hasItems && <button className='button' onClick={() => alert('Order Successfull!')}>Order</button>}
            </div>
        </CartModal>
    );
};

export default Cart;