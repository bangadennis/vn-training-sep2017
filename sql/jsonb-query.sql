SELECT *
FROM event;

SELECT *
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