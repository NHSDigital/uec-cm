import { CardInfo } from "../../components/cardGroup/interface";

const baseUrl = "/organisations/";

export const cards: CardInfo[] = [
    {   href: `${baseUrl}search`,
        text: "Search",
        description: "Search for an existing organisation",
        dataTestId: "search-card-link"
    },
    {
        href: `${baseUrl}add`,
        text: "Add",
        description: "Add a new organisation",
        dataTestId: "add-card-link"
    },
    {   href: `${baseUrl}edit`,
        text: "Edit",
        description: "Edit an existing organisation",
        dataTestId: "edit-card-link"
    },
];
