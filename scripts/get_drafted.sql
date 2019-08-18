COPY (
  SELECT
    *
  FROM
    player_data
  WHERE
    result = 'NFL')
TO '/Users/sallywhite/teamscraper/data/nfl_draft.csv' WITH CSV DELIMITER ',';

