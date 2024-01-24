function calculateIncomeTax(income, brackets) {
    const tax = brackets.reduce((a, c, i) => {
        const maxAmount = c.maxAmount;
        const minAmount = brackets[i - 1]?.maxAmount || 0;
        // Don't do the tax if not in the bracket.
        if (income < minAmount) {
            return a;
        }

        // Apply the tax to the amount in this bracket.
        if (income > minAmount && income < maxAmount) {
            const taxChunk = (income - minAmount) * c.rate;
            return a + taxChunk;
        }

        // Apply the tax to only some of the amount.
        const taxChunk = (maxAmount - minAmount) * c.rate;
        return a + taxChunk;
    }, 0)
    return tax;
}


const calculateNewTax = (income, isSuper) => {
    const brackets = [
        { rate: 0, maxAmount: 19000 },
        { rate: 0.16, maxAmount: 45000 },
        { rate: 0.30, maxAmount: 135000 },
        { rate: 0.37, maxAmount: 190000 },
        { rate: 0.45, maxAmount: 500000 }
    ];

    const incomeToTax = !!isSuper ? income - (income * 0.11) : income;
    const totalTax = calculateIncomeTax(incomeToTax, brackets)
    return totalTax;
};

const calculateS3Tax = (income, isSuper) => {
    const brackets = [
        { rate: 0, maxAmount: 18200 },
        { rate: 0.19, maxAmount: 45000 },
        { rate: 0.30, maxAmount: 200000 },
        { rate: 0.45, maxAmount: 500000 }
    ];
    const incomeToTax = !!isSuper ? income - (income * 0.11) : income;
    const totalTax = calculateIncomeTax(incomeToTax, brackets)
    return totalTax;
};

const calculateOldTax = (income, isSuper) => {
    const brackets = [
        { rate: 0, maxAmount: 18200 },
        { rate: 0.19, maxAmount: 45000 },
        { rate: 0.325, maxAmount: 120000 },
        { rate: 0.37, maxAmount: 180000 },
        { rate: 0.45, maxAmount: 500000 }
    ];
    const incomeToTax = !!isSuper ? income - (income * 0.11) : income;
    const totalTax = calculateIncomeTax(incomeToTax, brackets)
    return totalTax;
};


export { calculateNewTax, calculateS3Tax, calculateOldTax };