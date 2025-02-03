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
    - Only `approving admin` and the person whom the account belongs to shall have the privilege to delete the account.
    - The admin can change their password at any time. `approving admin` shall __not__ have this privilege over their `node admins`.
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
    bun add
    ```
    - Inside the backend directory run:
    ```
    npm install
    ```
- Create a .env file in backend directiory. Copy paste the values from [.env.example](/backend/.env.example) file of our repository. Fill in the values supporting your project.
- While being in backend directory go to command shell and run:
    ```
    sqlite3 database.db
    ```
    - Run the following commands in sqlite3 shell:
    ```
        CREATE TABLE transactions(id integer primary key, lotId integer not null, date varchar(80) not null, time varchar(80) not null);
        CREATE TABLE admins(id integer primary key, email varchar(100) not null, added_by integer, password text not null, name varchar(100));
        CREATE TABLE lots(lotId integer primary key, currentState interger not null, vehicle_for varchar(50), address text);
    ```
- Now you have to insert something called the `Head Admin`. Apparantly, addition of each `node admin` requires an `approving admin`. So, you have to manually create an account for the first account in the system. It shall be ultimate decision maker in the system. This account shall be called `Head Admin`.  
[insertNode.js](/backend/insertNode.js) is an isolated file that doesn't interfere with working of other backend files. Its sole purpose is addition of `Head Admin`. You can modify and run it.  
By simple convention the account with `id: 0` is the `Head Admin`.
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
- Configure all the ESP32s in the databases.
- The project is still in development and shall be updated regularly. Feel free to contribute.