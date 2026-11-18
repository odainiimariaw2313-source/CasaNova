CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    source_key CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(2048) NOT NULL,
    category VARCHAR(100) NOT NULL,
    product_group VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY products_source_key (source_key),
    KEY products_category_price (category, price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
