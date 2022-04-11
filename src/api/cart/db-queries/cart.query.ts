export const getCartQuery = `
    SELECT cart_items.id, products.id as product_id, products.name, products.price,  
        products.image_url, cart_items.quantity 
    FROM cart_items 
    LEFT JOIN products
    ON cart_items.product_id = products.id
    LEFT JOIN cart
    ON cart_items.cart_id = cart.id
    WHERE cart.id = (
        SELECT cart_id FROM users WHERE id = $1
    );
`;

export const addToCartQuery = `
   	INSERT INTO cart_items(product_id, cart_id, quantity) 
    SELECT $1, (SELECT cart_id FROM users WHERE id = $2), $3
    ON CONFLICT (cart_id, product_id) DO UPDATE 
    SET quantity = EXCLUDED.quantity
    RETURNING 1;
`;

export const removeFromCartQuery = `
   	DELETE FROM cart_items
    WHERE product_id = $1
    AND cart_id = (SELECT cart_id FROM users WHERE id = $2)
    RETURNING 1;
`;

export const clearCartQuery = `
    DELETE FROM cart_items 
    WHERE cart_id = (SELECT cart_id FROM users WHERE id = $1) 
    RETURNING 1;
`;
