export const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length !== 11) {
        return phoneNumber;
    }

    const formatted = cleaned.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        "$1 $2 $3 $4 $5"
    );
    return "+" + formatted;
};
