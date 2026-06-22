CREATE OR REPLACE PROCEDURE UpdateSalary(
    p_employee_id NUMBER,
    p_percentage NUMBER
)
IS
BEGIN

    UPDATE Employees
    SET Salary=Salary+(Salary*p_percentage/100)
    WHERE EmployeeID=p_employee_id;

    IF SQL%ROWCOUNT=0 THEN
        RAISE NO_DATA_FOUND;
    END IF;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Salary Updated Successfully');

EXCEPTION

    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee ID Not Found');

    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

BEGIN
    UpdateSalary(1,10);
END;
/