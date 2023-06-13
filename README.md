# Chat App
###### NodeJS, MySQL, and ReactJS
----
#### Installation

##### Dependencies
There are `server` and `client` directories. You have to `cd` into them separately and install their dependencies. To install, enter `npm install` in your terminal assuming that `NodeJS` has been installed.

##### Database
MySQL is the chosen database for this project. Other relational databases will most likely work but I haven't tested them yet.

- Duplicate the `.env.example` in the `server` and `client` directories and rename them to `.env`.
- To setup server, you may use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) and make sure to have the [MySQL Server](https://dev.mysql.com/downloads/mysql/) running too. Here's a [tutorial](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql) on how to work with MySQL Server in both Linux and Windows.
- Create a new `database` schema `chat_app` in Workbench.
- To connect `server` to `database`, checkout this [Prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql).
- After successfully connecting, start migrating `server/prisma/schema.prisma` to `database` using `npx prisma migrate dev --name init`.
- All set in `database`.

#### Running the App
You can start both the `server` and the `client` by running `npm run dev` in the terminal. Make sure terminal windows or tabs are already in `client` and `server`'s respective directory and `nodemon` is installed globally.