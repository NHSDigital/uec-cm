import { act, renderHook } from '@testing-library/react';
import usePagination from '../usePagination';
import { LocationOrganisation } from '../../services/api/interface';

describe('usePagination', () => {
  it('should handle next and previous page correctly', () => {

    const mockEvent = {
        preventDefault: jest.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>;

    const mockResults: LocationOrganisation[] = [
        {
          "id": "3081762637274642",
          "active": "true",
          "Address": [
              {
              "city": "London",
              "country": "England",
              "line": [
              "C/O Nhs England",
              "1st Floor, My House",
              "The Hill"
              ],
              "postalCode": "XX1 1XX"
              }
          ],
          "createdBy": "Admin",
          "createdDateTime": "06-02-2024 11:24:35",
          "modifiedBy": "Admin",
          "modifiedDateTime": "06-02-2024 11:24:35",
          "name": "London Mock Location 1",
          "entityType": "location"
        }
      ];

    const newMockResults = Array(50).fill([...mockResults]).flat();

    const itemsPerPage = 10;

    const { result } = renderHook(() => usePagination(newMockResults, itemsPerPage));

    expect(result.current.firstItemShown).toBe(1);
    expect(result.current.lastItemShown).toBe(10);
    expect(result.current.filteredResults).toHaveLength(10);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);

    act(() => {
        result.current.handleNextPage(mockEvent);
    });

    expect(result.current.firstItemShown).toBe(11);
    expect(result.current.lastItemShown).toBe(20);
    expect(result.current.filteredResults).toHaveLength(10);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(false);

    act(() => {
        result.current.handlePreviousPage(mockEvent);
    });

    expect(result.current.firstItemShown).toBe(1);
    expect(result.current.lastItemShown).toBe(10);
    expect(result.current.filteredResults).toHaveLength(10);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
  });

  it('should handle filtered results being 2 and not 10', () => {

    const mockEvent = {
        preventDefault: jest.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>;

    const mockResults: LocationOrganisation[] = [
        {
          "id": "3081762637274642",
          "active": "true",
          "Address": [
              {
              "city": "London",
              "country": "England",
              "line": [
              "C/O Nhs England",
              "1st Floor, My House",
              "The Hill"
              ],
              "postalCode": "XX1 1XX"
              }
          ],
          "createdBy": "Admin",
          "createdDateTime": "06-02-2024 11:24:35",
          "modifiedBy": "Admin",
          "modifiedDateTime": "06-02-2024 11:24:35",
          "name": "London Mock Location 1",
          "entityType": "location"
        }
      ];

    const newMockResults = Array(12).fill([...mockResults]).flat();

    const itemsPerPage = 10;

    const { result } = renderHook(() => usePagination(newMockResults, itemsPerPage));

    act(() => {
        result.current.handleNextPage(mockEvent);
    });

    expect(result.current.firstItemShown).toBe(11);
    expect(result.current.lastItemShown).toBe(12);
    expect(result.current.filteredResults).toHaveLength(2);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
  });
});
