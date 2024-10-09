import React, { useEffect, useState } from "react";
import { LocationOrganisation } from "../services/api/interface";

const usePagination = (results: LocationOrganisation[], itemsPerPage: number) => {
    const [firstItemShown, setFirstItemShown] = useState(1);
    const [lastItemShown, setLastItemShown] = useState(results.length < itemsPerPage ? results.length : itemsPerPage);
    const [filteredResults, setFilteredResults] = useState(results.slice(firstItemShown - 1, lastItemShown));

    const isFirstPage = firstItemShown === 1;
    const isLastPage = lastItemShown === results.length;

    const handlePreviousPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setFirstItemShown(firstItemShown - itemsPerPage < 1 ? 1 : firstItemShown - itemsPerPage);
        setLastItemShown(firstItemShown - 1);
    };

    const handleNextPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (lastItemShown + itemsPerPage <= results.length) {
            setFirstItemShown(lastItemShown + 1);
            setLastItemShown(lastItemShown + itemsPerPage);
        } else {
            setFirstItemShown(results.length - (results.length % itemsPerPage) + 1);
            setLastItemShown(results.length);
        }
    };

    useEffect(() => {
        setFilteredResults(results.slice(firstItemShown - 1, lastItemShown));
    }, [results, firstItemShown, lastItemShown]);

    return {
        firstItemShown,
        lastItemShown,
        filteredResults,
        setFilteredResults,
        isFirstPage,
        isLastPage,
        handlePreviousPage,
        handleNextPage,
    };
};

export default usePagination;
