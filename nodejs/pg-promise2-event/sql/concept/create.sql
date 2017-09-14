CREATE TABLE pgp_concept (
  uuid       UUID                     NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL             DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL             DEFAULT now(),
  code       TEXT                     NOT NULL UNIQUE,
  name       TEXT,
  schema     JSONB
);
