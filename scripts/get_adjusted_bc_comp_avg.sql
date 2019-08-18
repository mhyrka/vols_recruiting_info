SELECT
  to_char(AVG(composite), '99999999999999999D99') AS ADJ_composite_average
FROM
  recruits
WHERE
  name NOT IN (
    SELECT
      name
    FROM
      player_data
    WHERE
      result NOT IN ('GRAD', 'NFL', 'UDFA', 'CFL'))
  AND stars IN (4,
    5);

