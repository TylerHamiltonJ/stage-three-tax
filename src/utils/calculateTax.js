function calculateIncomeTax(income, brackets) {
    const tax = brackets.reduce((totalTax, bracket, i) => {
        const maxAmount = bracket.maxAmount;
        const minAmount = i > 0 ? brackets[i - 1].maxAmount : 0;

        if (income > minAmount) {
            const taxableAmount = Math.min(income, maxAmount) - minAmount;
            const taxChunk = taxableAmount * bracket.rate;
            totalTax += taxChunk;
        }

        return totalTax;
    }, 0);

    return tax;
}


const calculateNewTax = (income, isSuper) => {
    const brackets = [
        { rate: 0, maxAmount: 18200 },
        { rate: 0.16, maxAmount: 45000 },
        { rate: 0.30, maxAmount: 135000 },
        { rate: 0.37, maxAmount: 190000 },
        { rate: 0.45, maxAmount: Infinity }
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
        { rate: 0.45, maxAmount: Infinity }
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
        { rate: 0.45, maxAmount: Infinity }
    ];
    const incomeToTax = !!isSuper ? income - (income * 0.11) : income;
    const totalTax = calculateIncomeTax(incomeToTax, brackets)
    return totalTax;
};


export { calculateNewTax, calculateS3Tax, calculateOldTax };