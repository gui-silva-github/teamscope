# 📊 TeamScope - Laravel + React Starter Kit

**TeamScope** is a full-featured system for managing **employees** and **projects**, built with **React** (frontend) and **Laravel** (backend). It includes a dynamic **dashboard** that provides real-time insights such as:

- Total number of employees
- Unique roles
- Number of registered projects
- Sum of project values

> 🛠️ This project is functional but still open to improvements and optimizations.

<hr>

# Login e SignUp

<img src="https://github.com/gui-silva-github/teamscope/blob/main/public/images/Login%20e%20SignUp.png"/>

<hr>

# Dashboard

<img src="https://github.com/gui-silva-github/teamscope/blob/main/public/images/Dashboard.png"/>

<hr>

# Time

<img src="https://github.com/gui-silva-github/teamscope/blob/main/public/images/Time.png"/>

<hr>

# Projetos

<img src="https://github.com/gui-silva-github/teamscope/blob/main/public/images/Projetos.png"/>

<hr>

# Modal

<img src="https://github.com/gui-silva-github/teamscope/blob/main/public/images/Modal.png"/>

<hr>

## 🚀 Tecnologias

### Frontend
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Backend
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

<hr>

## 🚝 Ambientes de Execução necessários:

- Composer
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<hr>

## 📦 Recursos

- ✅ Full CRUD for employees
- ✅ CRUD for projects (with budgets/values)
- ✅ GitHub and LinkedIn profile integration
- ✅ Interactive dashboard with live statistics
- ✅ Responsive and modern interface
- ✅ RESTful API integration between backend and frontend

<hr>

## 🧑‍💻 Como rodar?

### Clone o repositório:
```bash
git clone https://github.com/gui-silva-github/teamscope.git
```

### Instale as dependências (Laravel):
```bash
composer install
```

### Instale as dependências (Node):
```bash
npm install
```

### Crie um .env no root do projeto:
```bash
cp .env.example .env
```

### Instancie os parâmetros do MySQL no .env criado:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=teamscope
DB_USERNAME=root
DB_PASSWORD=
```

### Rode o Vite e o Laravel:
```bash
composer run dev
```

### Clique nessa URL:
```bash
APP_URL: http://localhost:8000
```

<hr>

## ↪️ Manual para Uso:

### Database 

.env

config/database.php

<hr>

### Migration 

php artisan make:migration create_posts_table

-> Setar os campos

php artisan migrate

-> Criando a tabela

<hr>

### Model

php artisan make:model Post

-> Preencher fillable

<hr>

 ### Controller

php artisan make:controller PostController --resource

-> Fazer o return do index com: return Inertia::render('Posts', [
	'posts' => Post::all()
]);

<hr>

### View

-> Usar o resource para fazer CRUD

Route::resource('posts', PostController::class);

<hr>

### Ts em Render

pages/Posts.tsx:

-> Usar Head, router e usePage (GET e DELETE)

components/PostFormModal.tsx:

-> Usar router e instância de Post (PUT e POST)


