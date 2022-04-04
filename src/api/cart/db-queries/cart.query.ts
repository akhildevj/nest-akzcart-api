export const getCartQuery = `
    SELECT cart.id, product.name, product.price,  
        product.image_url, cart.quantity 
    FROM cart LEFT JOIN product
    ON cart.product_id = product.id
    WHERE cart.user_id = $1;
`;

export const addToCartQuery = `
    INSERT INTO cart(user_id, product_id, quantity) 
    SELECT $1, $2, $3
    WHERE EXISTS(
        SELECT 1 FROM user_profile LEFT JOIN product 
        ON user_profile.id = product.user_id
        WHERE user_profile.id = $1
        AND product.id = $2
    )
    ON CONFLICT (user_id, product_id) DO UPDATE 
    SET quantity = EXCLUDED.quantity
    RETURNING 1;
`;

export const clearCartQuery = `
    DELETE FROM cart WHERE user_id = $1 RETURNING 1;
`;
