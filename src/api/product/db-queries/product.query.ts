export const getAllProductsQuery = `
    SELECT
        products.id,
        products.name,
        products.price,
        products.image_url, 
        products.description,
        SUM(product_ratings.rating)/COUNT(product_ratings.rating) as rating
    FROM products
    LEFT JOIN product_ratings
    ON product_ratings.product_id = products.id
    WHERE products.is_deleted = FALSE
    GROUP BY products.id
    ORDER BY products.last_updated_at DESC;
`;

export const getProductDetailsQuery = `
    SELECT
        products.id,
        products.name,
        products.price,
        products.image_url, 
        products.description,
        SUM(product_ratings.rating)/COUNT(product_ratings.rating) as rating
    FROM products
    LEFT JOIN product_ratings
    ON product_ratings.product_id = products.id
    WHERE products.id = $1
    GROUP BY products.id;
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

export const updateproductRatingQuery = `
    INSERT INTO product_ratings(user_id, product_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT(user_id, product_id)
    DO UPDATE SET rating = EXCLUDED.rating
    RETURNING 1
`;
