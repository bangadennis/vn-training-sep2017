SELECT *
FROM event;

SELECT
  data ->> 'a',
  data -> 'b'
FROM event
WHERE data @> '{"b":2, "c": 1}';

SELECT jsonb_pretty(data)
FROM event;

SELECT
  date_part('year', e.collected_at)  AS year,
  date_part('month', e.collected_at) AS month,
  c.name                             AS concept,
  x.a,
  x.b,
  x.c,
  x.d
FROM event e LEFT JOIN concept c ON e.concept = c.id
  , jsonb_to_record(data) AS x(a INT, b INT, c INT, d INT);

SELECT
  data,
  array_agg(x) AS keys
FROM event, jsonb_object_keys(data) AS x
GROUP BY data;


SELECT sum((data ->> 'a') :: INTEGER)
FROM event;

SELECT sum((data #>> '{array,0,b}') :: INTEGER)
FROM event;


SELECT *
FROM event
WHERE data ? 'array';
SELECT *
FROM event
WHERE data ?& '{array,b}';
SELECT *
FROM event
WHERE data ?& ARRAY ['array', 'b'];

SELECT '[ "a", "b" ]' :: JSONB || '[ "c", "d" ]' :: JSONB;

SELECT data - 'a'
FROM event;

SELECT row_to_json(x)
FROM (
       SELECT
         year,
         department_name,
         jsonb_agg(price) AS price
       FROM
         sales_view
       WHERE
         year = 2011
       GROUP BY
         year, department_name
       ORDER BY year DESC, price ASC
     ) AS x;
