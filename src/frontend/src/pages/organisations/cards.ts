import { CardInfo } from "../../components/cardGroup/interface";
import { getUrlWithApiParam } from "../../services/utilities";

const baseUrl = "/organisations/";

export const searchUrl = `${baseUrl}search`;

export const cards: CardInfo[] = [
    {
        href: getUrlWithApiParam(searchUrl),
        text: "Search",
        description: "Search for an existing organisation",
        dataTestId: "search-card-link",
        width: "one-half"
    },
];
