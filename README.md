# APHC
## Automated Parking Hub for Cars

### Index
- [About](#about)
- [Features for Admins](#features-for-admins)
- [Get Started](#get-started)
- [Hardware Program Link](https://github.com/)

### About
This repository is a webapp designed to integrate with our IOT based mangement sytem.  
Our project simplifies the process of parking and payment through simple QR scanning and reduces human error in fare calculation thus benifitting both the customer and the parking operator.

### Features for Admins
- Login and account creation.
    - For every admin account created it needs approval of a previous admin. This `approving admin` will be held reponsible for the account created. And subsequently, the created account shall be called one of the `node admins` of that approving admin.
    - Only this admin (aside the person whom the account belongs to) shall have the privilege to delete the account.
    - The admin can change the password of the account created at any time. Approving admin shall not have this privilege over their node admins.
- Pardon of fares in expeptional cases.
- View statuses all the parked lots.

### Get Started
- You must have [NodeJS](https://nodejs.org/en/download/) installed on your sytem.
- We recommend installing [BunJS](https://bun.sh/) as a default package manager for frontend. It seems to offer much better performance than [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/).
Unfortunately, backend part still uses NPM.
- Clone the repository.
- Install the required packages.
    - Inside the frontend directory run:
    ```
    bun install
    ```
    - Inside the backend directory run:
    ```
    npm install
    ```
- Create a .env file in backend directiory. Copy paste the values from [.env.example](/backend/.env.example) file of our repository. Fill in the values supporting your project.
- While being in backend directory run:
    ```
    sqlite3 database.db
    ```
    - Run the following commands in sqlite3 shell:
    ```
        CREATE TABLE transactions(id integer primary key, lotId integer not null, date varchar(80) not null, time varchar(80) not null);
        CREATE TABLE admins(id integer primary key, email varchar(100) not null, added_by integer, password text not null, name varchar(100));
        CREATE TABLE lots(lotId integer primary key, currentState interger not null, vehicle_for varchar(50), address text);
    ```
- Now you have to insert something called the `Head Admin`. Apparantly, each node requires an approving admin. So, you have to manually create an account for the first account in the system. So, it will be the approving admin for all the other accounts.
- Run the server.
    - Inside the backend directory run:
    ```
    npm run dev
    ```
    - Inside the frontend directory run:
    ```
    bun run dev
    ```
- Now, you can access the frontend at [http://127.0.0.1:5173](http://127.0.0.1:5173).
- Now, configure all the ESP32s in the databases.
- The project is still in development and shall be updated regularly. Feel free to contribute.