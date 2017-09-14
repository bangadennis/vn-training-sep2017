CREATE TABLE pgp_event (
  uuid         UUID                     NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL             DEFAULT now(),
  updated_at   TIMESTAMP WITH TIME ZONE NOT NULL             DEFAULT now(),
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL,
  concept      UUID REFERENCES pgp_concept (uuid),
  location     POINT,
  data         JSONB
);
