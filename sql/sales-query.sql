SELECT
  i.NAME,
  ic.NAME
FROM item i LEFT JOIN item_category ic ON i.ID = ic.ID;

SELECT
  s.sold_at,
  s.price,
  i.name  AS name,
  ic.name AS department_name
FROM
  sales s
  JOIN item i ON s.item = i.ID
  JOIN item_category ic ON i.category = ic.id;

SELECT count(*)
FROM sales_view;
SELECT count(*)
FROM sales_matview;
REFRESH MATERIALIZED VIEW sales_matview;

SELECT
  date_part('year', sold_at) AS "year",
  COUNT(price)               AS price
FROM
  sales_view
GROUP BY
  "year"
ORDER BY price DESC;

SELECT
  year,
  department_name,
  SUM(price) AS price
FROM
  sales_view
WHERE
  year = 2011
GROUP BY
  year, department_name
ORDER BY year DESC, price ASC;
