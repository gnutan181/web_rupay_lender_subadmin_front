export let department = JSON.parse(sessionStorage.getItem("department_123")) || [];
export let subAdminRole = JSON.parse(sessionStorage.getItem("subadmin#2Role")) || '';
export let subAdminPermission = JSON.parse(sessionStorage.getItem("sub_8_Permission")) || [];


export const setDepartment = (values)=>{
    sessionStorage.setItem("department_123",JSON.stringify(values));
    department = values
};
export const setSubAdminRole = (values) => {
    sessionStorage.setItem("subadmin#2Role",JSON.stringify(values));
    subAdminRole = values;
}

export const setPermission = (values)=>{
    sessionStorage.setItem("sub_8_Permission",JSON.stringify(values));
    subAdminPermission = values
};