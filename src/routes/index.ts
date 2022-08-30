export const routes = {
    login: {
        title: "Авторизация",
        path: "/login",
        private: false
    },
    registration: {
        title: "Регистрация",
        path: "/registration",
        private: false
    },
    contacts: {
        title: "Личный кабинет",
        path: "/personal-area",
        private: true,
    },
    myContacts: {
        title: "Контакты",
        path: "contacts",
        generateFullPath() {
            return `${routes.contacts.path}/${this.path}`;
        },
        getParentRoute() {
            return routes.contacts;
        }
    },
    createContacts: {
        title: "Создать контакт",
        path: "create",
        generateFullPath() {
            return `${routes.contacts.path}/${routes.myContacts.path}/${this.path}`
        },
        getParentRoute() {
            return routes.myContacts;
        }
    },
    updateContacts: {
        title: "Редактировать контакт",
        path: "edit/:id",
        generatePath(id: number) {
            return `edit/${id}`;
        },
        generateFullPath(id?: number) {
            if (id) {
                return `${routes.contacts.path}/${routes.myContacts.path}/${this.path}/${id}`
            } else {
                return `${routes.contacts.path}/${routes.myContacts.path}/${this.path}`
            }
        },
        getParentRoute() {
            return routes.myContacts;
        },
    }
}