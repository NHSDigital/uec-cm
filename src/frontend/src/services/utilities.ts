export const getStringNumericValue = (str: string): number | null => {
    const num = Number(str);
    if (!isNaN(num) && isFinite(num)) {
        return num;
    }

    return null;
};
