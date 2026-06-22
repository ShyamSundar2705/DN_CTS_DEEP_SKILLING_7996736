--Package Specification
CREATE OR REPLACE PACKAGE CustomerManagement AS

    PROCEDURE AddCustomer(
        p_customer_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    );

    PROCEDURE UpdateCustomer(
        p_customer_id NUMBER,
        p_name VARCHAR2
    );

    FUNCTION GetCustomerBalance(
        p_customer_id NUMBER
    ) RETURN NUMBER;

END CustomerManagement;
/

--Package Body
CREATE OR REPLACE PACKAGE BODY CustomerManagement AS

    PROCEDURE AddCustomer(
        p_customer_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    )
    IS
    BEGIN

        INSERT INTO Customers(CustomerID,Name,DOB,Balance,LastModified)
        VALUES(p_customer_id,p_name,p_dob,p_balance,SYSDATE);

        COMMIT;

    END;

    PROCEDURE UpdateCustomer(
        p_customer_id NUMBER,
        p_name VARCHAR2
    )
    IS
    BEGIN

        UPDATE Customers
        SET Name=p_name
        WHERE CustomerID=p_customer_id;

        COMMIT;

    END;

    FUNCTION GetCustomerBalance(
        p_customer_id NUMBER
    )
    RETURN NUMBER
    IS
        v_balance NUMBER;
    BEGIN

        SELECT Balance INTO v_balance
        FROM Customers
        WHERE CustomerID=p_customer_id;

        RETURN v_balance;

    END;

END CustomerManagement;
/

--Test
BEGIN
    CustomerManagement.AddCustomer(
        5,
        'David Miller',
        TO_DATE('1992-05-15','YYYY-MM-DD'),
        8000
    );
END;
/

SELECT CustomerManagement.GetCustomerBalance(1)
FROM Dual;