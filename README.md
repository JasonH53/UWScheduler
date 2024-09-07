UWScheduler
===========

A modern and minimalistic web app that allows students to plan out their assignments for different subjects ahead of time and check off completed tasks.

(WIP)

# How to run

- Install [Node.js](https://nodejs.org/en)
- Clone the repository 
- To run this locally:

Backend:
```
cd api
npm install
touch .env
```
Create the .env file with the following format:
```
MONGODB_URI=XXX
JWT_SECRET=XXX
```

Return to home directory
```
cd ..
```

Frontend:
```
cd frontend
npm install
cd src
touch environment.ts
```

Create an environment.ts file:
```
export const environment = {
    production: true,
    apiUri: 'API_URL',
};
```

Demo:
![Sample UI](https://github.com/JasonH53/UWAssignmentPlanner/blob/main/images/Screenshot%202024-01-01%20174155.png)
