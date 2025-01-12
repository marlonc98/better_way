import PaginatedEntity from "@/app/domain/entities/paginated_entity";
import WaiterEntity from "@/app/domain/entities/waiter_entity";

export default interface PaginatedListProps<T> {
    render: (item: T) => JSX.Element;
    fetchData: (page: number, itemsPerPage: number) => Promise<WaiterEntity<PaginatedEntity<T>>>;
    itemsPerPage?: number;
}