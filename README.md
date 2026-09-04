# CaseStudy

## How to Run the Project Locally

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CaseStudy
```

### 2. Install Backend Dependencies

Navigate to the backend folder:


cd backend
npm install
install all the dependence in package.json


### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

env
GEMINI_API_KEY=your_gemini_api_key 
MONGO_URI=your_mongodb_connection_string
//Note:- Sometimes the ket limit can exceed so change the version in openai.js file which is in backend -> utils -> openai.js


### 4. Start the Backend

Run the backend server:

nodemon app.js


The backend will run on: http://localhost:8080


### 5. Start the Frontend

Open a **new terminal** and navigate to the frontend folder:

cd frontend
npm install
npm run dev


The frontend will normally run on:http://localhost:5173


## API Endpoints

### Chat API

This endpoint accepts multiple strings in a multiple request and processes each string independently using the Gemini API.


```http
POST http://localhost:8080/api/chat
```

### Request Body

```json
{
  "inputs": [
    "What is JavaScript?",
    "What is MongoDB?",
    "What is Express.js?"
  ]
}
```

### How It Works

1. The client sends a list of strings.
2. The server validates the request using threadId.
3. The system fetches the userInput from MongoDB.
4. Each input is processed independently.
5. Gemini API calls are executed concurrently.
6. The responses are returned in the same order as the input strings.

### Example Response

```json
{
  "responses": [
    "JavaScript is a programming language...",
    "MongoDB is a NoSQL database...",
    "Express.js is a Node.js web framework..."
  ]
}
```

---

## 🔄 Request Flow

```text
Client
   |
   | POST /api/chat
   ↓
Express.js Server
   |
   ↓
Validate Input
   |
   ↓
Fetch Prompt from MongoDB
   |
   ↓
Collect Responses
   |
   ↓
Return Responses in Same Order
   |
   ↓
Client
```

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Google Gemini API
* JavaScript
* REST API
* React
* CORS
