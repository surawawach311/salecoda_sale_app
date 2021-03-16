export const currencyFormat = (num: number, decimal = 0) => {
    if (num >= 0) {
        return "฿" + num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
        return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace("-", "-฿");
    }
};
