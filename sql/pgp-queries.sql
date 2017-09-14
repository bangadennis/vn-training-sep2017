
SELECT * FROM pgp_concept;
SELECT * FROM pgp_event;

SELECT ST_AsGeoJson(location::GEOMETRY) FROM pgp_event;
SELECT ST_AsGeoJson(ST_Collect(location::GEOMETRY)) FROM pgp_event;

SELECT ST_GeomFromGeoJson('{"type":"Point","coordinates":[125.6,10.1]}')::POINT;

SELECT
  (kmeans + 1)                                    AS id,
  count(*)                                        AS size,
  ST_AsGeoJson(ST_Centroid(ST_Collect(location::GEOMETRY))) AS location
FROM
  (
    SELECT
      ST_ClusterKMeans(location::GEOMETRY, 5)
      OVER () AS kmeans,
      location
    FROM pgp_event
  ) AS ksub
GROUP BY kmeans
ORDER BY kmeans

SELECT ST_AsGeoJson(ST_Collect(x.location)) FROM (
SELECT
  (kmeans + 1)                                    AS id,
  count(*)                                        AS size,
  ST_Centroid(ST_Collect(location::GEOMETRY)) AS location
FROM
  (
    SELECT
      ST_ClusterKMeans(location::GEOMETRY, 5)
      OVER () AS kmeans,
      location
    FROM pgp_event
  ) AS ksub
GROUP BY kmeans
ORDER BY kmeans
) AS x;
