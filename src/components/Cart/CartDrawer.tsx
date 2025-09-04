import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../../context/CartContext';

const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, clear, total, open, closeCart } = useCart();

  return (
    <div className={`${styles.drawer} ${open ? styles.open : ''}`} role="dialog" aria-hidden={!open}>
      <div className={styles.header}>
        <h3>Cart</h3>
        <button className={styles.closeButton} onClick={closeCart}>×</button>
      </div>

      <div className={styles.content}>
        {items.length === 0 ? (
          <div className={styles.empty}>Your cart is empty</div>
        ) : (
          <ul className={styles.items}>
            {items.map(item => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemMain}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemMeta}>${item.price.toFixed(2)}</div>
                </div>
                <div className={styles.itemActions}>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className={styles.qty}
                  />
                  <button className={styles.remove} onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>Total: ${total.toFixed(2)}</div>
        <div className={styles.footerActions}>
          <button className={styles.clear} onClick={clear}>Clear</button>
          <button className={styles.checkout} disabled={items.length === 0}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
