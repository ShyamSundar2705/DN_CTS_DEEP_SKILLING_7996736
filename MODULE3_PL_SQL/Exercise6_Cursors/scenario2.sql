SET SERVEROUTPUT ON;

DECLARE

    CURSOR ApplyAnnualFee IS
    SELECT AccountID,Balance
    FROM Accounts;

    v_fee NUMBER:=100;

BEGIN

    FOR account_record IN ApplyAnnualFee
    LOOP

        UPDATE Accounts
        SET Balance=Balance-v_fee
        WHERE AccountID=account_record.AccountID;

        DBMS_OUTPUT.PUT_LINE(
            'Annual Fee Deducted From Account ID ' ||
            account_record.AccountID
        );

    END LOOP;

    COMMIT;

END;
/