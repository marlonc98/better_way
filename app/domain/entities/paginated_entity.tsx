export default interface PaginatedEntity<T> {
    data: T[];
    total: number;
    currentPage: number;
    lastPage: number;
    itemsPerPage: number;
}