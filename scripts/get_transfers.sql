COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result LIKE '%TRANSFER%')
TO '/Users/sallywhite/teamscraper/data/results/transfers.csv' WITH CSV DELIMITER ',';

