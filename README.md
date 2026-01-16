# Fincheck API 💰📊 
The **Fincheck API** is a backend application developed with **NestJS**, designed to serve as a solid foundation for a financial application. The project explores best practices in architecture, authentication, validation, and relational database integration, resulting in a cohesive, scalable, and easy-to-maintain API. 

--- 

## 🧱 Architecture and Organization 
The API was structured following the **modules/resources** pattern, with a clear separation of responsibilities: 
- **Controllers** → HTTP layer (routes and responses)
- **Services** → Business rules
- **Repositories** → Data access and persistence
This organization facilitates maintenance, testing, and project evolution.

--- 

## 🔐 Authentication and Security 
The project implements a complete authentication flow using **JWT**, leveraging advanced NestJS features: 
- Public and protected routes
- Authentication via **JSON Web Token**
- **Guards** and **Global Guards** for access control
- **Custom Decorators** to access authenticated user data

--- 

## 🧩 Custom Pipes and Decorators 
To keep the code clean and expressive, the API uses: 
- **Custom Pipes** for data validation and transformation
- **Custom Decorators** to abstract repetitive logic in the controllers These features make the API more consistent and aligned with NestJS best practices.

--- 

## 🗄️ Database 
- **Prisma ORM** for modeling and accessing the database
- **PostgreSQL**
- Database running locally via **Docker**, ensuring a predictable and easy-to-configure environment

--- 

## 🛠️ Technologies Used 
- **NestJS**
-  **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **JWT**

---

## ⚙️ How to Clone and Run Locally

### 1. Clone the repository
```
git clone https://github.com/VitinhoSouza/fincheck-api.git
cd fincheck-api
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Create a .env file based on .env.example and set the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fincheck"
JWT_SECRET="your_jwt_secret"
```

### 4. Start the database with Docker
```
docker compose up -d
```

### 5. Run Prisma migrations
```
npx prisma migrate dev
```

### 6. Start the application
```
npm run start:dev
```
The API will be available at:
👉 http://localhost:3000
