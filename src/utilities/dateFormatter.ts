
export const dateFormatter = (unformattedDate: string): string => {
        const date = new Date(unformattedDate);
        return date.toLocaleDateString('en-US');
}

export default dateFormatter