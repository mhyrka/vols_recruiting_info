COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result IN ('NFL', 'UDFA'))
TO '/Users/sallywhite/teamscraper/data/aggregated_data/all_nfl.csv' WITH CSV DELIMITER ',';

