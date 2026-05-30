class UserManager {
    constructor() {
        this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
        this.container = document.getElementById('cardsContainer');
        this.statsElement = document.getElementById('stats');
    }

    async fetchUsers() {
        try {
            const response = await fetch(this.apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ошибка: ${response.status}`);
            }
            
            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            throw error;
        }
    }

    createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
        
        card.innerHTML = `
            <h2>${this.escapeHtml(user.name)}</h2>
            <div class="username">@${this.escapeHtml(user.username)}</div>
            <p><span class="label">Email:</span> ${this.escapeHtml(user.email)}</p>
            <p><span class="label">Телефон:</span> ${this.escapeHtml(user.phone)}</p>
            <p><span class="label">Сайт:</span> <a href="http://${user.website}" target="_blank">${this.escapeHtml(user.website)}</a></p>
            <p><span class="label">Компания:</span> ${this.escapeHtml(user.company.name)}</p>
            <div class="address">
                <strong>Адрес:</strong><br>
                ${this.escapeHtml(address)}
            </div>
        `;
        
        return card;
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Отображение статистики
    updateStats(usersCount) {
        this.statsElement.textContent = `Всего пользователей: ${usersCount}`;
    }

    showError(errorMessage) {
        this.container.innerHTML = `
            <div class="error">
                Ошибка: ${this.escapeHtml(errorMessage)}<br>
                Попробуйте обновить страницу позже.
            </div>
        `;
        this.statsElement.textContent = '';
    }

    showLoading() {
        this.container.innerHTML = '<div class="loading">Загрузка пользователей...</div>';
    }

    async renderAllUsers() {
        this.showLoading();
        
        try {
            const users = await this.fetchUsers();
            
            this.container.innerHTML = '';
            
            users.forEach(user => {
                const card = this.createUserCard(user);
                this.container.appendChild(card);
            });
            
            this.updateStats(users.length);
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    async renderSingleUser(userId) {
        this.showLoading();
        
        try {
            const response = await fetch(`${this.apiUrl}/${userId}`);
            
            if (!response.ok) {
                throw new Error(`Пользователь с ID ${userId} не найден`);
            }
            
            const user = await response.json();
            
            this.container.innerHTML = '';
            
            const card = this.createUserCard(user);
            this.container.appendChild(card);
            
            this.updateStats(1);
            
        } catch (error) {
            this.showError(error.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userManager = new UserManager();
    
    userManager.renderAllUsers();
    
});

