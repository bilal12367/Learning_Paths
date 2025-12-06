

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

interface IPermission {
    name: string,
    description: string,
    id?: string
}

interface InsertResultId {
    ids: string[]
}