import PermissionsTypes from "./permission_entity";

export default interface UserEntity {
    id: number;
    name: string;
    permissions: PermissionsTypes[];
}