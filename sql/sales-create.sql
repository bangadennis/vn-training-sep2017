DROP VIEW IF EXISTS sales_view;
DROP MATERIALIZED VIEW IF EXISTS sales_matview;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS item_category;

CREATE TABLE item_category (
  id         SERIAL NOT NULL PRIMARY KEY,
  name       TEXT,
  department TEXT
);

CREATE TABLE item (
  id       SERIAL NOT NULL PRIMARY KEY,
  name     TEXT,
  category INTEGER REFERENCES item_category (id)
);

CREATE TABLE sales (
  id      SERIAL                   NOT NULL PRIMARY KEY,
  sold_at TIMESTAMP WITH TIME ZONE NOT NULL,
  item    INTEGER REFERENCES item (id),
  price   INTEGER
);

CREATE VIEW sales_view AS (
  SELECT
    s.id,
    s.sold_at,
    date_part('year', s.sold_at)  AS "year",
    date_part('month', s.sold_at) AS "month",
    date_part('day', s.sold_at)   AS "day",
    s.price,
    i.name                        AS name,
    ic.name                       AS department_name
  FROM
    sales s
    JOIN item i ON s.item = i.ID
    JOIN item_category ic ON i.category = ic.id
);

CREATE MATERIALIZED VIEW sales_matview AS (
  SELECT
    s.id,
    s.sold_at,
    date_part('year', s.sold_at)  AS "year",
    date_part('month', s.sold_at) AS "month",
    date_part('day', s.sold_at)   AS "day",
    s.price,
    i.name                        AS name,
    ic.name                       AS department_name
  FROM
    sales s
    JOIN item i ON s.item = i.ID
    JOIN item_category ic ON i.category = ic.id
) WITH NO DATA;

INSERT INTO item_category VALUES (1, 'Fruit', 'Produce');
INSERT INTO item_category VALUES (2, 'Vegetables', 'Produce');
INSERT INTO item_category VALUES (3, 'Fresh Meat', 'Buther');
INSERT INTO item_category VALUES (4, 'Frozen Meat', 'Buther');

INSERT INTO item VALUES (1, 'Apple', 1);
INSERT INTO item VALUES (2, 'Dragonfruit', 1);
INSERT INTO item VALUES (3, 'Carrot', 2);
INSERT INTO item VALUES (4, 'Onion', 2);
INSERT INTO item VALUES (5, 'Pork Rib', 3);
INSERT INTO item VALUES (6, 'Sirloin Steak', 3);
INSERT INTO item VALUES (7, 'Porkchops', 4);
INSERT INTO item VALUES (8, 'Sirloin Steak', 4);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 1, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-04-01', 1, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-01-01', 1, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 1, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-02-01', 1, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 2, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-05-01', 2, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-01-01', 2, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-05-01', 2, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-06-01', 2, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 3, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-07-01', 3, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-04-01', 3, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 3, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-03-01', 3, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 4, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-05-01', 4, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2012-01-01', 4, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2013-07-01', 4, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2014-06-01', 4, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-06-01', 5, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-01-01', 5, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-02-01', 5, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-05-01', 5, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 5, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 6, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-07-01', 6, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-04-01', 6, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-02-01', 6, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-03-01', 6, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 7, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-07-01', 7, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 7, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-03-01', 7, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-01-01', 7, 10);

INSERT INTO sales (sold_at, item, price) VALUES ('2011-01-01', 8, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-02-01', 8, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-07-01', 8, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2011-05-01', 8, 10);
INSERT INTO sales (sold_at, item, price) VALUES ('2010-06-01', 8, 10);
