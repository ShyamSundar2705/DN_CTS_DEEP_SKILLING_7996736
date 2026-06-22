CREATE OR REPLACE PROCEDURE AddNewCustomer(
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

    DBMS_OUTPUT.PUT_LINE('Customer Added Successfully');

EXCEPTION

    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Customer ID Already Exists');

    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

BEGIN
    AddNewCustomer(3,'Michael Scott',TO_DATE('1980-06-15','YYYY-MM-DD'),5000);
END;
/