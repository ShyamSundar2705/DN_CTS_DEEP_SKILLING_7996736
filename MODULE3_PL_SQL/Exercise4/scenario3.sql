CREATE OR REPLACE FUNCTION HasSufficientBalance(
    p_account_id NUMBER,
    p_amount NUMBER
)
RETURN BOOLEAN
IS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID=p_account_id;

    RETURN v_balance >= p_amount;

EXCEPTION

    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;

END;
/

DECLARE
    v_result BOOLEAN;
BEGIN

    v_result := HasSufficientBalance(1,500);

    IF v_result THEN
        DBMS_OUTPUT.PUT_LINE('Sufficient Balance');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
    END IF;

END;
/