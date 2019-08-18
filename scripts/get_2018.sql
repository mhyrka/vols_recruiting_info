COPY (
  SELECT
    name,
    position,
    stars
  FROM
    recruits
  WHERE
    recruiting_class = '2018')
TO '/Users/sallywhite/teamscraper/data/aggregated_data/2018.csv' WITH CSV DELIMITER ',';

