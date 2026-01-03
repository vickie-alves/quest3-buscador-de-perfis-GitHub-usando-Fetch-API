async function fetchUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`Erro de HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        return {
            "user_avatar": data.avatar_url,
            "user_name": data.name,
            "user_login": data.login,
            "user_bio": data.bio,
            "user_followers": data.followers,
            "user_following": data.following
        };
    } catch (error) {
        console.error("Ocorreu um problema com a fetch operation. Erro:", error);
        return null;
    }
};

async function fetchEventData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
        if (!response.ok) {
            throw new Error(`Erro de HTTP! Status: ${response.status}`);
        }
        const data = await response.json();

        const events = data.filter(event => event.type === "PushEvent" || event.type === "CreateEvent");

        const fetchEventMessages = events.map(async event => {
            if(event.type === "PushEvent") {
                const messageResponse = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`);
                if (!messageResponse.ok) {
                    throw new Error(`Erro de HTTP! Status: ${response.status}`);
                }
                const messageData = await messageResponse.json();
                return {
                    "repo_name": event.repo.name,
                    "repo_message": messageData.commit?.message ?? "Sem mensagem de commit."
                };
            }
            return {
                "repo_name": event.repo.name,
                "repo_message": "Eventos de criação não possuem mensagem de commit."
            }
        });
        return await Promise.all(fetchEventMessages);
    } catch (error) {
        console.error("Ocorreu um problema com a fetch operation. Erro:", error);
        return [];
    }
};

async function fetchReposData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=12`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        const repoData = data.map(repo => {
            return {
                "id": repo.id,
                "repo_name": repo.name,
                "repo_link": repo.git_url,
                "forks_count": repo.forks_count,
                "stargazers_count": repo.stargazers_count,
                "watchers_count": repo.watchers_count,
                "code_language": repo.language
            };
        });
        return repoData.sort((a, b) => { return b.id - a.id; });

    } catch (error) {
        console.error("There was a problem with the fetch operation. Error:", error);
        return null;
    }
};

export { fetchUserData, fetchEventData, fetchReposData };