## Версия Node v16.17.0

## Скрипты

В каталоге проекта вы можете запустить:

### `npm start`

Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

### `npm run build`

Собирает приложение для производства в папку `build`.\

### `npm run server`

Запускает сервер на основе `json-server`.

## Технологии

1. React 
2. Redux Toolkit
3. TypeScript
4. Axios
5. Ant Design 
6. Json Server
7. SCSS препроцессор CSS
8. Classnames

## Страницы

Все страницы:

### Авторизация `/` | `/login` 
Страница авторизации. Пользователь может ввести почту и пароль.

### Регистраци `/regisration`
Страница регистрации. Пользователь вводит имя, почту и пароль.

### Личный кабинет `/personal-area`
Личный кабинет пользователя. На странице данные пользователя, количество контактов и кнопка выхода с аккаунта.

### Контакты `/personal-area/contacts`
Страница контактов пользователя. Пользователь может создавать, редактировать и удалять свои контакты.

### Создать контакт `/personal-area/contacts/create`
Страница где создается контакт. Вводится полное имя, почта, телефон, возраст и ссылка на его изображение.

### Редактировать контакт `/personal-area/contacts/edit/:id`
Страница где редактируется контакт