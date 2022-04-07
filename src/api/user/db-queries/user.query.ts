export const getUserQuery = `
	SELECT id, name, email, image_url, bio, mobile, address, created_at
	FROM users WHERE id = $1;
`;

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

export const updateUserQuery = `
	UPDATE users SET
		name = $1,
		image_url = $2,
		bio = $3,
		mobile = $4, 
		address = $5
	WHERE id = $6
	RETURNING 1;
`;
