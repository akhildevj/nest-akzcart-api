export const getAllProductsQuery = `
    SELECT id, name, price, rating, description 
    FROM product WHERE is_deleted = FALSE;
`;

export const getProductDetailsQuery = `
    SELECT id, name, price, rating, description 
    FROM product WHERE id = $1;
`;

export const addProductQuery = `
    INSERT INTO product (name, price, image_url, description, user_id) 
    VALUES ($1, $2, $3, $4, '1');
`;

export const deleteProductQuery = `
    UPDATE product SET is_deleted = TRUE
    WHERE id = $1;
`;
