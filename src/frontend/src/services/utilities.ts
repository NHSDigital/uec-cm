export const getStringNumericValue = (str: string): number | null => {
    const num = Number(str);
    if (!isNaN(num) && isFinite(num)) {
        return num;
    }

    return null;
};

export const getBranchFromUrlParam = (): string => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const branch = params.get('branch');
    return branch ? branch : "main";
};

export const getTestFolder = (folder: string) : string => {
    const baseUrl = "https://raw.githubusercontent.com/NHSDigital/uec-cm/";
    const mockDataFolder = "/src/frontend/src/mockdata/";
    return baseUrl + getBranchFromUrlParam() + mockDataFolder + folder + "/";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMockApiData = async (url: string, fileName: string): Promise<any> => {
    const response = await fetch(url + fileName + ".json");
    if (!response.ok) {
        const defaultResponse = await fetch(url + "default.json");
        if (!defaultResponse.ok) {
            throw new Error('Network response was not ok');
        }

        return defaultResponse.json();
    }

    return response.json();
}
