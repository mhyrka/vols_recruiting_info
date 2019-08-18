SELECT
  to_char(AVG(composite), '99999999999999999D99') AS composite_average
FROM
  recruits
WHERE
  stars IN (4, 5);

