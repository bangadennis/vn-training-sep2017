DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS concept;

CREATE TABLE concept (
  id   SERIAL NOT NULL PRIMARY KEY,
  name TEXT
);

CREATE TABLE event (
  id           SERIAL                      NOT NULL PRIMARY KEY,
  created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  collected_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  concept      INTEGER REFERENCES concept (id),
  data         JSONB
);

CREATE INDEX idx_event_data
  ON event USING GIN (data JSONB_PATH_OPS);

INSERT INTO concept (name) VALUES ('Dengu');
INSERT INTO concept (name) VALUES ('Fever');
INSERT INTO concept (name) VALUES ('ServerStats');

INSERT INTO event (collected_at, concept, data) VALUES ('2010-01-01', 1, '{ "a": 1, "b": 2, "c": 3 }');
INSERT INTO event (collected_at, concept, data) VALUES ('2010-02-01', 1, '{ "a": 3, "b": 2, "c": 1 }');
INSERT INTO event (collected_at, concept, data) VALUES ('2010-03-01', 1, '{ "a": 2, "b": 1, "c": 3 }');
INSERT INTO event (collected_at, concept, data) VALUES ('2010-04-01', 1, '{ "a": 2, "b": 3, "c": 3 }');
INSERT INTO event (collected_at, concept, data) VALUES ('2010-05-01', 1, '{ "a": 3, "b": 1, "c": 2 }');

INSERT INTO event (collected_at, data) VALUES ('2010-06-01', jsonb_object('{a,b,c,d}', '{1,2,3,4}'));
INSERT INTO event (collected_at, data) VALUES ('2010-07-01', jsonb_build_object('a', 3, 'b', 2, 'c', 1));

INSERT INTO event (collected_at, data) VALUES ('2010-07-01',
 '
 {
   "a": 1,
   "b": 2,
   "array": [
     { "a": 100, "b": 200 },
     { "a": 100, "b": 200 },
     { "a": 100, "b": 200 }
   ]
 }
 '
);
