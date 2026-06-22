SET SERVEROUTPUT ON;

DECLARE

    CURSOR UpdateLoanInterestRates IS
    SELECT LoanID,InterestRate
    FROM Loans;

BEGIN

    FOR loan_record IN UpdateLoanInterestRates
    LOOP

        IF loan_record.InterestRate>10 THEN

            UPDATE Loans
            SET InterestRate=InterestRate-1
            WHERE LoanID=loan_record.LoanID;

        ELSE

            UPDATE Loans
            SET InterestRate=InterestRate+0.5
            WHERE LoanID=loan_record.LoanID;

        END IF;

        DBMS_OUTPUT.PUT_LINE(
            'Updated Interest Rate For Loan ID ' ||
            loan_record.LoanID
        );

    END LOOP;

    COMMIT;

END;
/