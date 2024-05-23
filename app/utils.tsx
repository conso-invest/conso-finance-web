// utils/formatNumber.js
export const formatNumber = (number: any) => {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
    }).format(number);
};
