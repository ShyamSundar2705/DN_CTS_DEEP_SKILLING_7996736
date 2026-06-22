SET SERVEROUTPUT ON;

BEGIN
    FOR loan_record IN (
        SELECT c.Name,l.LoanID,l.EndDate
        FROM Customers c
        JOIN Loans l ON c.CustomerID=l.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE+30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: ' ||
            loan_record.Name ||
            ', Loan ID ' ||
            loan_record.LoanID ||
            ' is due on ' ||
            loan_record.EndDate
        );
    END LOOP;
END;
/