--Package Specification
CREATE OR REPLACE PACKAGE EmployeeManagement AS

    PROCEDURE HireEmployee(
        p_employee_id NUMBER,
        p_name VARCHAR2,
        p_position VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    );

    PROCEDURE UpdateEmployee(
        p_employee_id NUMBER,
        p_salary NUMBER
    );

    FUNCTION CalculateAnnualSalary(
        p_employee_id NUMBER
    ) RETURN NUMBER;

END EmployeeManagement;
/

--Package Body
CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS

    PROCEDURE HireEmployee(
        p_employee_id NUMBER,
        p_name VARCHAR2,
        p_position VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    )
    IS
    BEGIN

        INSERT INTO Employees(EmployeeID,Name,Position,Salary,Department,HireDate) 
        VALUES(p_employee_id,p_name,p_position,p_salary,p_department,SYSDATE);

        COMMIT;

    END;

    PROCEDURE UpdateEmployee(
        p_employee_id NUMBER,
        p_salary NUMBER
    )
    IS
    BEGIN

        UPDATE Employees
        SET Salary=p_salary
        WHERE EmployeeID=p_employee_id;

        COMMIT;

    END;

    FUNCTION CalculateAnnualSalary(
        p_employee_id NUMBER
    )
    RETURN NUMBER
    IS
        v_salary NUMBER;
    BEGIN

        SELECT Salary INTO v_salary
        FROM Employees
        WHERE EmployeeID=p_employee_id;

        RETURN v_salary*12;

    END;

END EmployeeManagement;
/

--Test
SELECT EmployeeManagement.CalculateAnnualSalary(1)
FROM Dual;