

interface IRolePermission {
    id?: string
    roleId: string
    permissionId: string
    serverId: string
}

interface IRole {
    description: string,
    name: string
    id?: string
}