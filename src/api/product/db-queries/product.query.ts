export const getAllProductsQuery = `
    SELECT id, name, price, rating, image_url, description 
    FROM product WHERE is_deleted = FALSE
    ORDER BY last_updated_at DESC;
`;

export const getProductDetailsQuery = `
    SELECT id, name, price, image_url, rating, description 
    FROM product WHERE id = $1;
`;

export const addProductQuery = `
    INSERT INTO product (name, price, image_url, description, user_id) 
    VALUES ($1, $2, $3, $4, '1');
`;

export const updateProductQuery = `
    UPDATE product SET
    name = $2, price = $3, image_url = $4, description = $5
    WHERE id = $1 RETURNING 1;
`;

export const deleteProductQuery = `
    UPDATE product SET is_deleted = TRUE 
    WHERE id = $1 AND is_deleted = FALSE RETURNING 1;
`;
