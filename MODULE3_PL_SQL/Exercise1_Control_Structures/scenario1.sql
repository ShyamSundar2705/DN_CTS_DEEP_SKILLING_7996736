SET SERVEROUTPUT ON;

DECLARE
    v_age NUMBER;
BEGIN
    FOR customer_record IN (
        SELECT c.CustomerID,c.DOB,l.LoanID,l.InterestRate
        FROM Customers c
        JOIN Loans l ON c.CustomerID=l.CustomerID
    )
    LOOP
        v_age := FLOOR(MONTHS_BETWEEN(SYSDATE,customer_record.DOB)/12);

        IF v_age > 60 THEN
            UPDATE Loans
            SET InterestRate = InterestRate - 1
            WHERE LoanID = customer_record.LoanID;

            DBMS_OUTPUT.PUT_LINE('Discount applied for Loan ID ' || customer_record.LoanID);
        END IF;
    END LOOP;

    COMMIT;
END;
/