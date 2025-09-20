# URL Shortener

A simple **URL shortening service** built with Node.js, NestJS, and Prisma. Users can register, log in, and shorten URLs, getting a short code that redirects to the original URL.

---

## 🚀 Features

- User authentication (register & login)
- Shorten URLs for logged-in users
- Redirect short URLs to the original URL
- Minimalistic, clean API design
- Optional front-end integration

---

## 🛠 Tech Stack

- **Backend:** Node.js, NestJS, Prisma  
- **Database:** PostgreSQL (or your preferred DB)  
- **Authentication:** JWT  
- **Frontend (optional):** React / Vanilla JS  

---

## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/urlshortener.git
cd urlshortener 
```

2. Install dependencies:
```
npm install
```

Set up your .env file:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run database migrations:
```
npx prisma migrate dev
```

Start the server:

```
npm run start:dev
```

Server should be running at: http://localhost:3000

📌 API Endpoints
Authentication

POST /auth/register – Register a new user

POST /auth/login – Login and receive JWT token

URL Shortening

POST /url/shorten-user – Shorten a URL (requires authentication)

GET /:shortCode – Redirect to the original URL


📝 Example Request
```
curl -X POST http://localhost:3000/url/shorten-user \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"originalUrl": "https://google.com"}'
```

Response:
```
{
  "shortUrl": "http://localhost:3000/ioegnS6i",
  "originalUrl": "https://google.com",
  "userId": 1
}
```
📄 License

MIT License
