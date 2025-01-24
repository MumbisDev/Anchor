# Anchor

Anchor is a habit and progress tracking application. Anchor allows you to create and manage different habits, track your progress via a progression system along with other stats, and log your accomplishments.

## Tech Stack

**Client:** React, Redux

**Server:** Node, Flask, SQLAlchemy, PostgreSQL

## Screenshots

### Habits Page
![habits](https://github.com/user-attachments/assets/e6c912ef-96a8-4065-a92a-16a6978d5e2e)



## Installation

Clone the project

```bash
  git clone https://github.com/MumbisDev/Anchor.git
```

### Frontend

In the react-vite directory, run:

```bash
npm install
```

Once this is done, simply run:

```bash
npm run dev
```

The frontend should now be up and running, available at `http://localhost:5173/`

### Backend

In the root directory, run this command to install requirements and initialize the virtual environment:

```bash
pipenv install -r requirements.txt
```

To insure you are in the virtual environment:

```bash
pipenv shell
```

In the root directory, create an `.env ` and a `.flaskenv` file for your environment variables. You can do it via your code editor or the terminal:

```bash
touch .env .flaskenv
```

To run this project, you will need to add the following environment variables to your .env file

**For your `.env`**

`SECRET_KEY` set to a randomly generated key

`DATABASE_URL` set to the database url (like `sqlite:///dev.db`)

`SCHEMA` set to `anchor_schema`

`FLASK_ENV` set to `development` (unless running in production)

**For your `.flaskenv`**

`FLASK_APP` set to `app`

`FLASK_DEBUG` set to `true` (unless running in production)

`FLASK_RUN_PORT` set to `8000` or another desired port

**Initialize the database, run migrations and seed data:**

```bash
flask db init
flask db migrate
flask db upgrade
flask seed all
```

Once successful, we can now run our backend via this command:

```bash
pipenv run flask run
```

## Features

- Multiple CRUD Features
- Live Statistics
- Easy and Intuitive User Interface

## Roadmap

- Theme options
- More habit data visualization
- Making the progression system more rewarding
- Ironing out quirks

## Feedback

If you have any feedback, please reach out to me at zillcrumpton@gmail.com

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zildjian-crumpton-99079a180/)
[![twitter/X](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/MumbisDev)
