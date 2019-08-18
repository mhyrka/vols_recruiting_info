COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result = 'QUIT')
TO '/Users/sallywhite/teamscraper/data/results/quit.csv' WITH CSV DELIMITER ',';

