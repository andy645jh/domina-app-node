//move to Redux store
export const setId = (val: string) => {
    localStorage.setItem("id_user", val);
};

export const getId = () => {
    return parseInt(localStorage.getItem("id_user") ?? "-1");
}