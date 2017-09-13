CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS period;

CREATE TABLE event (
  uuid         UUID                     NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at   TIMESTAMP WITH TIME ZONE NOT NULL,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location     POINT,
  data         JSONB
);

CREATE TABLE period (
  uuid        UUID                     NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at  TIMESTAMP WITH TIME ZONE NOT NULL,
  name        TEXT,
  pattern     TEXT,
  lower_bound DATE                     NOT NULL,
  upper_bound DATE                     NOT NULL,
  month       INTEGER,
  year        INTEGER                  NOT NULL
);

CREATE INDEX idx_event_data
  ON event USING GIN (data JSONB_PATH_OPS);
