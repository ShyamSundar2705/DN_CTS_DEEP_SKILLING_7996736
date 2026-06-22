CREATE OR REPLACE FUNCTION CalculateAge(
    p_dob DATE
)
RETURN NUMBER
IS
    v_age NUMBER;
BEGIN

    v_age := FLOOR(MONTHS_BETWEEN(SYSDATE,p_dob)/12);

    RETURN v_age;

END;
/

SELECT CalculateAge(
       TO_DATE('1985-05-15','YYYY-MM-DD')
       ) AS Age
FROM Dual;