export const productSelectQuery =
  'SELECT id, name, price, image_url, description, rating FROM products';

export const getAdminProductsQuery = `
    SELECT 
        id, name, price, image_url, description, 
        rating, created_at, last_updated_at, is_deleted
    FROM products WHERE user_id = $1 
    ORDER BY last_updated_at DESC LIMIT $2 OFFSET $3;
`;

export const getProductDetailsQuery = `
    SELECT id, name, price, image_url, description, rating
    FROM products WHERE products.id = $1;
`;

export const addProductQuery = `
    INSERT INTO products (name, price, image_url, description, user_id) 
    VALUES ($1, $2, $3, $4, $5);
`;

export const updateProductQuery = `
    UPDATE products SET
    name = $2, price = $3, image_url = $4, description = $5
    WHERE id = $1 RETURNING 1;
`;

export const deleteProductQuery = `
    UPDATE products SET is_deleted = TRUE 
    WHERE id = $1 AND is_deleted = FALSE RETURNING 1;
`;

export const restoreProductQuery = `
    UPDATE products SET is_deleted = FALSE 
    WHERE id = $1 AND is_deleted = TRUE RETURNING 1;
`;

export const updateproductRatingQuery = `
    WITH
    user_rating_exists AS (
        SELECT rating FROM product_ratings
        WHERE user_id = $1 AND product_id = $2
    ),
    user_rating_count AS (
        SELECT COUNT(rating) AS count 
        FROM product_ratings WHERE product_id = $2
    ),
    update_product_rating AS (
        UPDATE products SET rating = (
            CASE WHEN (SELECT COUNT(*) FROM user_rating_exists) > 0 
            THEN (((
                SELECT COALESCE(SUM(rating), 0) 
                FROM product_ratings WHERE user_id != $1) 
                + $3 )
                / (SELECT count FROM user_rating_count)
            )
            ELSE ((rating + $3) / ((SELECT count FROM user_rating_count) + 1))
            END
        ) WHERE productS.id = $2
    )
    INSERT INTO product_ratings(user_id, product_id, rating) 
    VALUES ($1, $2, $3)
    ON CONFLICT(user_id, product_id) 
    DO UPDATE SET rating = EXCLUDED.rating RETURNING 1
`;

export const getFavouriteProductsQuery = `
    SELECT 
        products.id, 
        products.name, 
        products.price, 
        products.image_url, 
        products.description, 
        products.rating
    FROM favourites
    LEFT JOIN products 
    ON favourites.product_id = products.id
    WHERE products.is_deleted = FALSE 
    AND favourites.user_id = $1
    ORDER BY products.last_updated_at DESC;
`;

export const addToFavouritesQuery = `
    INSERT INTO favourites (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING 1;
`;

export const removeFromFavouritesQuery = `
    DELETE FROM favourites 
    WHERE user_id= $1 AND product_id = $2  
    RETURNING 1;
`;
