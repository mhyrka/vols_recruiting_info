DROP TABLE IF EXISTS player_data;

CREATE TABLE player_data (
  name varchar(55),
  position varchar(5),
  stars int,
  games_played int,
  result varchar(15)
);

COPY player_data (name,
  position,
  stars,
  games_played,
  result)
FROM
  '/Users/sallywhite/teamscraper/data/aggregated_data/basic_player_results_no_headers.csv' DELIMITER ',' CSV HEADER;

