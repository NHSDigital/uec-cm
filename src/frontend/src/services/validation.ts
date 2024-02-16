export const isPostcodeValid = (postcode: string): boolean => {
    const trimmedPostcode = postcode.replace(/\s+/g, ' ').trim()
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(trimmedPostcode);
}

export const isNameValid = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9.,&'\-+()[\] ]{1,100}$/
    return nameRegex.test(name);
}
