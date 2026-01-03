const container = document.querySelector(".container");

function userLayout(user, events, repos) {
    const profileData = document.createElement("div");
    profileData.classList.add("profile-data");
    container.appendChild(profileData);
    const profileContainer = document.querySelector(".profile-data");
    if(!user) {
        profileContainer.innerHTML = `
            <div class="profile-data">
                <div class="info section">
                    <img class="img pic-unavailable" src="" alt="Foto de Perfil do Usuário"/>
                    <div class="data">
                        <h1>"Não possui nome cadastrado😥"</h1>
                    </div>
                </div>
            </div>`
        return;
    }
    profileContainer.innerHTML = `
        <div class="profile-data">
            <div class="info">
                <img class="img pic-available" src=${user.user_avatar} alt="Foto de Perfil do Usuário"/>
                <div class="data">
                    <h1>${user.user_name ?? "Não possui nome informado"}</h1>
                    <p>${user.user_bio ?? "Não possui biografia informada"}</p>
                    <p>👥 Seguidores: ${user.user_followers}</p>
                    <p>➡️ Seguindo: ${user.user_following}</p>
                </div>
            </div>    
            <div class="repositories section">
                <h2>Repositórios</h2>

                <ul>${repos.map(repo => `
                    <li>
                        <a href=${repo.repo_link.replace("git:", "https:")} target="_blank">
                            <h3>${[...repo.repo_name].map(char => {
                                if(char === "_" || char === "." || char === "-" || char === char.toUpperCase() || char !== char.toLowerCase()) {
                                    return "<wbr>" + char;
                                }
                                return char;
                            }).join("")}</h3>
                            <p>💻 ${(repo.code_language === null) ? "Linguagem<wbr> desconhecida" : repo.code_language}</p>
                            <p>🍴 Forks: ${repo.forks_count}</p>
                            <p>⭐ Stargazers: ${repo.stargazers_count}</p>
                            <p>👀 Watchers: ${repo.watchers_count}</p>
                        </a>
                    </li>`).join("")}
                </ul>
            </div>
            <div class="events">
                <table class="event-list">
                    <thead class="table-title">
                        <tr>
                            <th colspan="2">Últimos Eventos</th>
                        </tr>
                    </thead>
                    <thead class="table-header">
                        <tr>
                            <th>Diretório</th>
                            <th>Mensagem</th>
                        </tr>
                    </thead>
                    <tbody class="table-items">${events.map(event => `
                        <tr>
                            <td>${event.repo_name}</td>
                            <td>${event.repo_message}</td>
                        </tr>`).join("")}
                    </tbody>
                </table>
            </div>
        </div>`;
};

export { userLayout };