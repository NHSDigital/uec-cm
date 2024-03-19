import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination, { PaginationProps } from "../index";

describe('PaginationProps', () => {
    it('should render the pagination component with the correct props when there are results', () => {
        const props: PaginationProps = {
            isFirstPage: false,
            isLastPage: false,
            firstItemShown: 1,
            lastItemShown: 10,
            totalResults: 100,
            handlePreviousPage: jest.fn(),
            handleNextPage: jest.fn(),
        };

        render(<Pagination {...props} />);

        expect(screen.getByTestId('previous-link')).toBeInTheDocument();
        expect(screen.getByTestId('next-link')).toBeInTheDocument();

        const firstItemShown = screen.getByTestId('first-item-shown');
        const lastItemShown = screen.getByTestId('last-item-shown');
        const totalResults = screen.getByTestId('total-results');

        expect(firstItemShown).toBeInTheDocument();
        expect(lastItemShown).toBeInTheDocument();
        expect(totalResults).toBeInTheDocument();

        expect(firstItemShown).toHaveTextContent('1');
        expect(lastItemShown).toHaveTextContent('10');
        expect(totalResults).toHaveTextContent('100');
    });

    it('should render the "Previous" link as disabled when there are no results', () => {
      const props: PaginationProps = {
        isFirstPage: true,
        isLastPage: false,
        firstItemShown: 0,
        lastItemShown: 0,
        totalResults: 0,
        handlePreviousPage: jest.fn(),
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);

      const firstItemShown = screen.getByTestId('first-item-shown');
      const lastItemShown = screen.getByTestId('last-item-shown');
      const totalResults = screen.getByTestId('total-results');

      expect(firstItemShown).toHaveTextContent('0');
      expect(lastItemShown).toHaveTextContent('0');
      expect(totalResults).toHaveTextContent('0');

      expect(screen.getByText('Previous')).toHaveClass('disabled');
      expect(screen.getByTestId('next-link')).toBeInTheDocument();
    });

    it('should render the "Previous" link as disabled when on the first page', () => {
      const props: PaginationProps = {
        isFirstPage: true,
        isLastPage: false,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 100,
        handlePreviousPage: jest.fn(),
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);

      expect(screen.getByText('Previous')).toHaveClass('disabled');
    });

    it('should render the "Next" link as disabled when on the last page', () => {
      const props: PaginationProps = {
        isFirstPage: false,
        isLastPage: true,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 100,
        handlePreviousPage: jest.fn(),
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);

      expect(screen.getByText('Next')).toHaveClass('disabled');
    });

    it('should render the correct range of items being shown', () => {
      const props: PaginationProps = {
        isFirstPage: false,
        isLastPage: false,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 100,
        handlePreviousPage: jest.fn(),
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);

      const firstItemShown = screen.getByTestId('first-item-shown');
      const lastItemShown = screen.getByTestId('last-item-shown');
      const totalResults = screen.getByTestId('total-results');

      expect(firstItemShown).toBeInTheDocument();
      expect(lastItemShown).toBeInTheDocument();
      expect(totalResults).toBeInTheDocument();

      expect(firstItemShown).toHaveTextContent('1');
      expect(lastItemShown).toHaveTextContent('10');
      expect(totalResults).toHaveTextContent('100');
    });

    it('should call handlePreviousResult when previous result link is clicked', () => {
      const handlePreviousResult = jest.fn();

      const props: PaginationProps = {
        isFirstPage: false,
        isLastPage: false,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 100,
        handlePreviousPage : handlePreviousResult,
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);
      fireEvent.click(screen.getByTestId('previous-link'));

      expect(handlePreviousResult).toHaveBeenCalledTimes(1);
    });

    it('should call handleNextResult when Next link is clicked', () => {
      const handleNextResult = jest.fn();

      const props: PaginationProps = {
        isFirstPage: false,
        isLastPage: false,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 100,
        handlePreviousPage: jest.fn(),
        handleNextPage: handleNextResult,
      };

      render(<Pagination {...props} />);
      fireEvent.click(screen.getByTestId('next-link'));

      expect(handleNextResult).toHaveBeenCalledTimes(1);
    });

    it('should render Next link as disabled when there are no results', () => {
      const props: PaginationProps = {
        isFirstPage: false,
        isLastPage: true,
        firstItemShown: 1,
        lastItemShown: 10,
        totalResults: 11,
        handlePreviousPage: jest.fn(),
        handleNextPage: jest.fn(),
      };

      render(<Pagination {...props} />);

      expect(screen.getByText('Next')).toHaveClass('disabled');
    });
});
