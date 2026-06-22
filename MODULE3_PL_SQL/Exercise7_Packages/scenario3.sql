--Package Specification
CREATE OR REPLACE PACKAGE AccountOperations AS

    PROCEDURE OpenAccount(
        p_account_id NUMBER,
        p_customer_id NUMBER,
        p_account_type VARCHAR2,
        p_balance NUMBER
    );

    PROCEDURE CloseAccount(
        p_account_id NUMBER
    );

    FUNCTION GetTotalBalance(
        p_customer_id NUMBER
    ) RETURN NUMBER;

END AccountOperations;
/

--Package Body
CREATE OR REPLACE PACKAGE BODY AccountOperations AS

    PROCEDURE OpenAccount(
        p_account_id NUMBER,
        p_customer_id NUMBER,
        p_account_type VARCHAR2,
        p_balance NUMBER
    )
    IS
    BEGIN

        INSERT INTO Accounts(
            AccountID,
            CustomerID,
            AccountType,
            Balance,
            LastModified
        )
        VALUES(
            p_account_id,
            p_customer_id,
            p_account_type,
            p_balance,
            SYSDATE
        );

        COMMIT;

    END;

    PROCEDURE CloseAccount(
        p_account_id NUMBER
    )
    IS
    BEGIN

        DELETE FROM Accounts
        WHERE AccountID=p_account_id;

        COMMIT;

    END;

    FUNCTION GetTotalBalance(
        p_customer_id NUMBER
    )
    RETURN NUMBER
    IS
        v_total NUMBER;
    BEGIN

        SELECT SUM(Balance)
        INTO v_total
        FROM Accounts
        WHERE CustomerID=p_customer_id;

        RETURN NVL(v_total,0);

    END;

END AccountOperations;
/

--Test
SELECT AccountOperations.GetTotalBalance(1)
FROM Dual;