ALTER TABLE Customers ADD IsVIP VARCHAR2(5);

SET SERVEROUTPUT ON;

BEGIN
    FOR customer_record IN (
        SELECT CustomerID,Balance
        FROM Customers
    )
    LOOP
        IF customer_record.Balance > 10000 THEN

            UPDATE Customers
            SET IsVIP='TRUE'
            WHERE CustomerID=customer_record.CustomerID;

            DBMS_OUTPUT.PUT_LINE('VIP Status Granted to Customer ID ' || customer_record.CustomerID);

        END IF;
    END LOOP;

    COMMIT;
END;
/