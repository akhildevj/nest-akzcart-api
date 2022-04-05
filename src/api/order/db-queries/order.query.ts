export const getOrdersQuery = `
    SELECT id, ordered_at, total_price, cart
    FROM orders WHERE user_id = $1;
`;

export const getOrderByIdQuery = `
    SELECT id, ordered_at, total_price, cart
    FROM orders WHERE user_id = $1 
    AND id = $2;
`;

export const createOrderQuery = `
    INSERT INTO orders(user_id, total_price, cart) 
    VALUES ($1, $2, $3);
`;
