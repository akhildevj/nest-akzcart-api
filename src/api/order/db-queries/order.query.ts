export const getOrdersQuery = `
    SELECT
	orders.id,
	orders.ordered_at,
	orders.total_price,
	JSON_AGG(
		JSON_BUILD_OBJECT(
			'name', products.name,
            'price', products.price,
            'quantity', cart_items.quantity,
			'rating', (
				SELECT rating FROM product_ratings 
				WHERE user_id = $1
				AND product_id = products.id
			)
		)
	) AS cart
    FROM orders
    LEFT JOIN cart ON orders.cart_id = cart.id
    LEFT JOIN cart_items ON cart.id = cart_items.cart_id
    LEFT JOIN products ON cart_items.product_id = products.id
    WHERE orders.user_id = $1
	GROUP BY orders.id;
`;

export const getOrderByIdQuery = `
    SELECT
	orders.ordered_at,
	orders.total_price,
	JSON_AGG(
		JSON_BUILD_OBJECT(
			'name', products.name,
            'price', products.price,
            'quantity', cart_items.quantity,
            'rating', (
				SELECT rating FROM product_ratings 
				WHERE user_id = $1
				AND product_id = products.id
			)
		)
	) AS cart
    FROM orders
    LEFT JOIN cart ON orders.cart_id = cart.id
    LEFT JOIN cart_items ON cart.id = cart_items.cart_id
    LEFT JOIN products ON cart_items.product_id = products.id
    WHERE orders.user_id = $1 AND orders.id = $2
	GROUP BY orders.id;
`;

export const createOrderQuery = `WITH
    current_cart AS (
        SELECT cart_id FROM users WHERE id = $1
    ),
    create_order AS (
        INSERT INTO orders(user_id, cart_id, total_price) 
        VALUES (
            $1, 
            (SELECT cart_id FROM current_cart),
            (
                SELECT SUM (products.price * cart_items.quantity) 
                FROM cart_items
                LEFT JOIN products ON cart_items.product_id = products.id
                WHERE cart_items.cart_id = (SELECT cart_id FROM current_cart)
            )
        )
    ),
    create_cart_instance AS (
        INSERT INTO cart(user_id) VALUES ($1) RETURNING cart.id
    )
    UPDATE users SET cart_id = (SELECT id FROM create_cart_instance)
    WHERE users.id = $1;
`;
