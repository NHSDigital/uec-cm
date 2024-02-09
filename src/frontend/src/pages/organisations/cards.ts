import { CardInfo } from "../../components/cardGroup/interface";

const baseUrl = "/organisations/";

export const searchUrl = `${baseUrl}search`;
export const addUrl = `${baseUrl}add`;
export const editUrl = `${baseUrl}edit`;

export const cards: CardInfo[] = [
    {   href: searchUrl,
        text: "Search",
        description: "Search for an existing organisation",
        dataTestId: "search-card-link"
    },
    {
        href: addUrl,
        text: "Add",
        description: "Add a new organisation",
        dataTestId: "add-card-link"
    },
    {   href: editUrl,
        text: "Edit",
        description: "Edit an existing organisation",
        dataTestId: "edit-card-link"
    },
];
