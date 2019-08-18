COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result LIKE '%DISMISSED%')
TO '/Users/sallywhite/teamscraper/data/results/dismissed.csv' WITH CSV DELIMITER ',';

