DROP TABLE IF EXISTS recruits;

CREATE TABLE recruits (
  name varchar(55),
  position varchar(5),
  stars int,
  metrics varchar(20),
  composite float8,
  recruiting_class varchar
);

COPY recruits
FROM
  '/Users/sallywhite/teamscraper/data/master_recruiting_list.csv' WITH (
    FORMAT csv
);

