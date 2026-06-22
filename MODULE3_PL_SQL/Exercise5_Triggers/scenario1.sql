CREATE OR REPLACE TRIGGER UpdateCustomerLastModified
BEFORE UPDATE
ON Customers
FOR EACH ROW
BEGIN

    :NEW.LastModified := SYSDATE;

END;
/

--Test
UPDATE Customers
SET Balance=2000
WHERE CustomerID=1;

--Verify
SELECT CustomerID,
       Name,
       LastModified
FROM Customers;