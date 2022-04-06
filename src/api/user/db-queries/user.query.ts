export const signupQuery = `WITH
	user_exists AS (
		SELECT 1 FROM users WHERE id = $1 OR email = $3
	),
    create_cart_instance AS (
        INSERT INTO cart(user_id) 
		SELECT ($1)
		WHERE NOT EXISTS(SELECT 1 FROM user_exists)
		RETURNING cart.id
    )
    INSERT INTO users(id, name, email, cart_id)
    SELECT $1, $2, $3, (SELECT id FROM create_cart_instance)
	WHERE NOT EXISTS(SELECT 1 FROM user_exists)
    RETURNING 1;
`;
