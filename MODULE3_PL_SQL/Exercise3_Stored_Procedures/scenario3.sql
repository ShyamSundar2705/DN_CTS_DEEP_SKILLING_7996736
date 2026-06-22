CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account NUMBER,
    p_to_account NUMBER,
    p_amount NUMBER
)
IS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID=p_from_account;

    IF v_balance < p_amount THEN
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
        RETURN;
    END IF;

    UPDATE Accounts
    SET Balance=Balance-p_amount
    WHERE AccountID=p_from_account;

    UPDATE Accounts
    SET Balance=Balance+p_amount
    WHERE AccountID=p_to_account;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Funds Transferred Successfully');

EXCEPTION

    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Account Not Found');

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);

END;
/

BEGIN
    TransferFunds(1,2,500);
END;
/