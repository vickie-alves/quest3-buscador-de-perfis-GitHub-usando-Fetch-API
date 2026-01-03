import { fetchUserData, fetchEventData, fetchReposData } from "./services/fetch.js";
import { userLayout } from "./render/render.js";

const button = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

button.addEventListener("click", async () => {
    const username = inputSearch.value.trim();
    const [userData, eventData, reposData] = await Promise.all([
        fetchUserData(username),
        fetchEventData(username),
        fetchReposData(username)
    ]);
    userLayout(userData, eventData, reposData);
});