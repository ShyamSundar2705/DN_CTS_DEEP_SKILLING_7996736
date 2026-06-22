CREATE OR REPLACE TRIGGER CheckTransactionRules
BEFORE INSERT
ON Transactions
FOR EACH ROW
DECLARE
    v_balance NUMBER;
BEGIN

    IF :NEW.TransactionType='Deposit'
       AND :NEW.Amount <= 0 THEN

        RAISE_APPLICATION_ERROR(
            -20001,
            'Deposit Amount Must Be Positive'
        );

    END IF;

    IF :NEW.TransactionType='Withdrawal' THEN

        SELECT Balance
        INTO v_balance
        FROM Accounts
        WHERE AccountID=:NEW.AccountID;

        IF :NEW.Amount > v_balance THEN

            RAISE_APPLICATION_ERROR(
                -20002,
                'Insufficient Balance'
            );

        END IF;

    END IF;

END;
/

--Test valid deposit
INSERT INTO Transactions(TransactionID,AccountID,TransactionDate,Amount,TransactionType) 
VALUES(4,1,SYSDATE,500,'Deposit');

--Test invalid deposit
INSERT INTO Transactions(TransactionID,AccountID,TransactionDate,Amount,TransactionType) 
VALUES(5,1,SYSDATE,-100,'Deposit');

--Test Invalid withdrawal
INSERT INTO Transactions(TransactionID,AccountID,TransactionDate,Amount,TransactionType) 
VALUES(6,1,SYSDATE,50000,'Withdrawal');