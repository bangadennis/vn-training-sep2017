INSERT INTO pgp_event VALUES (
  ${uuid},
  ${createdAt},
  ${updatedAt},
  ${collectedAt},
  ${concept},
  ST_GeomFromGeoJSON(${location:json})::POINT,
  ${data:json}
);