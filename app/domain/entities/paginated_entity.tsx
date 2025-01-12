export default interface PaginatedEntity<T> {
    items: T[];
    total: number;
    currentPage: number;
    lastPage: number;
    itemsPerPage: number;
}