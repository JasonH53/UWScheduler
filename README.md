UWScheduler
===========

A modern and minimalistic web app that allows students to plan out their assignments for different subjects ahead of time and check off completed tasks.

(WIP)

# How to run

- Install [Node.js](https://nodejs.org/en)
- Install [Docker](https://www.docker.com/)
- Clone the repository 
- To run this locally:

Create the .env file in api:
```
MONGODB_URI=XXX
JWT_SECRET=XXX
```

Create an environment.ts in frontend:
```
export const environment = {
    production: true,
    apiUri: 'API_URL',
};
```

Run
```
docker-compose up --build
```
