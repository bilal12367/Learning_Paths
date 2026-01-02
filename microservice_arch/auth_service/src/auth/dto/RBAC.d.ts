

interface ServerRbacDto { 
    perms?: Permission[] ; 
    roles?: Role[] ;  
    users?: User[] ;
    role_permission_mapping?: RolePermission[] ;
    user_role_mapping?: UserRole[] ;
}