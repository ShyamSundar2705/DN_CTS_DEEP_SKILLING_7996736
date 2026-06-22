SET SERVEROUTPUT ON;

DECLARE

    CURSOR GenerateMonthlyStatements IS
    SELECT t.TransactionID,
           a.AccountID,
           c.Name,
           t.Amount,
           t.TransactionType,
           t.TransactionDate
    FROM Transactions t
    JOIN Accounts a ON t.AccountID=a.AccountID
    JOIN Customers c ON a.CustomerID=c.CustomerID
    WHERE EXTRACT(MONTH FROM t.TransactionDate)=EXTRACT(MONTH FROM SYSDATE)
    AND EXTRACT(YEAR FROM t.TransactionDate)=EXTRACT(YEAR FROM SYSDATE);

BEGIN

    FOR transaction_record IN GenerateMonthlyStatements
    LOOP

        DBMS_OUTPUT.PUT_LINE(
            'Customer: ' || transaction_record.Name ||
            ', Transaction ID: ' || transaction_record.TransactionID ||
            ', Amount: ' || transaction_record.Amount ||
            ', Type: ' || transaction_record.TransactionType
        );

    END LOOP;

END;
/