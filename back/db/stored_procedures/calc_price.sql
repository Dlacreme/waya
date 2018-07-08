DROP PROCEDURE calcul_price;

DELIMITER //
CREATE PROCEDURE calcul_price
    (IN p_order_id INT)
job:BEGIN

-- Get products Prices
DROP TABLE IF EXISTS tmp_prices;
CREATE TEMPORARY TABLE tmp_prices
AS
(
    SELECT
        p.id AS 'product_id',
        pp.price
    FROM orders o
    INNER JOIN order_products op
        ON o.id = op.order_id
    INNER JOIN products p
        ON p.id = op.product_id
    INNER JOIN product_prices pp
        ON p.id = pp.product_id
        AND pp.start_date <= op.created_at
        AND (pp.end_date IS NULL OR pp.end_date > op.created_at)
    WHERE o.id = p_order_id
);

-- Get Voucher by with direct reduction (id = 2)
SET @direct_reduction = (
    SELECT
        SUM(v.value)
    FROM orders o
    INNER JOIN voucher_consumption ov
        ON o.id = ov.order_id
    INNER JOIN vouchers v
        ON v.id = ov.voucher_id
        AND v.voucher_type_id = 2
);

-- Get Voucher by % (id = 1)
SET @perc_reduction = (
    SELECT
        SUM(v.value)
    FROM orders o
    INNER JOIN voucher_consumption ov
        ON o.id = ov.order_id
    INNER JOIN vouchers v
        ON v.id = ov.voucher_id
        AND v.voucher_type_id = 1
);
    
    UPDATE orders
    SET total_price = (
        SELECT
            (
            (SUM(price) - IFNULL(@direct_reduction, 0))
                -
                (
                    (SUM(price) - IFNULL(@direct_reduction, 0))
                    *
                    (IFNULL(@perc_reduction, 0) / 100)
                )
            )
        FROM tmp_prices
    )
    WHERE id = p_order_id;

END //
DELIMITER ;

-- CALL calcul_price(1);