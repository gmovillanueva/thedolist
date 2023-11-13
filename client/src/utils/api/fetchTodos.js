import { doFetch, railsAPI } from "@utils/api/apiController.js";

export const fetchTodos = () =>
    doFetch(`${railsAPI}/api/v1/todos`).then((data) => data);
