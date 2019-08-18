COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result IN ('NFL', 'CFL', 'GRAD', 'UDFA')
    AND games_played < 20)
TO '/Users/sallywhite/teamscraper/data/results/underperformers.csv' WITH CSV DELIMITER ',';

