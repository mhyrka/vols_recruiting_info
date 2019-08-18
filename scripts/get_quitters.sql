COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result NOT IN ('NFL', 'CFL', 'UDFA', 'GRAD', 'ENR'))
TO '/Users/sallywhite/teamscraper/data/results/all_quitters.csv' WITH CSV DELIMITER ',';

