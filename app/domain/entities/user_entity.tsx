import PermissionEntity from "./permission_entity";

export default interface UserEntity {
    id: number;
    name: string;
    imageUrl: string;
    permissions: PermissionEntity;
}