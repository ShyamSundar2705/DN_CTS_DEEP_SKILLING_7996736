CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(
    p_loan_amount NUMBER,
    p_interest_rate NUMBER,
    p_years NUMBER
)
RETURN NUMBER
IS
    v_total_interest NUMBER;
    v_monthly_installment NUMBER;
BEGIN

    v_total_interest := p_loan_amount *
                        p_interest_rate *
                        p_years / 100;

    v_monthly_installment :=
        (p_loan_amount + v_total_interest) /
        (p_years * 12);

    RETURN ROUND(v_monthly_installment,2);

END;
/

SELECT CalculateMonthlyInstallment(
       500000,
       8,
       5
       ) AS EMI
FROM Dual;