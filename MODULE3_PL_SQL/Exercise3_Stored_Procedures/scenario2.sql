CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department VARCHAR2,
    p_bonus_percentage NUMBER
)
IS
BEGIN

    UPDATE Employees
    SET Salary=Salary+(Salary*p_bonus_percentage/100)
    WHERE Department=p_department;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Bonus Applied Successfully');

EXCEPTION

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

BEGIN
    UpdateEmployeeBonus('IT',10);
END;
/