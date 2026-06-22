CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN

    UPDATE Accounts
    SET Balance=Balance+(Balance*0.01)
    WHERE AccountType='Savings';

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Monthly Interest Processed Successfully');

EXCEPTION

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

BEGIN
    ProcessMonthlyInterest;
END;
/