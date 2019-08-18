COPY (
  SELECT
    name,
    position,
    stars
  FROM
    recruits
  WHERE
    stars = 4
    OR stars = 5)
  TO '/Users/sallywhite/teamscraper/data/basic_player_results.csv' WITH CSV DELIMITER ',';

