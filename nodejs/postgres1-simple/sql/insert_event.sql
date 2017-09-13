INSERT INTO event VALUES (
  ${uuid},
  ${createdAt},
  ${updatedAt},
  ${collectedAt},
  ${location},
  ${data:json}
)
RETURNING uuid;