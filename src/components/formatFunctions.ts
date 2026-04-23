export const formatCPF= (digits: string = ''): string => {
        digits = digits.replace(/\D/g, '').slice(0, 11);
        if (!digits) return '';
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
        if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    };

export const formatData = (date: string) => {
        if (!date || date.trim() === "") return null;
        // Remove a parte de hora se existir e pega apenas a data
        const dateOnly = date.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        return `${day}/${month}/${year}`;
    };

export const formatDateToISO = (date: string) => {
        if (!date || date.trim() === "") return null;
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };