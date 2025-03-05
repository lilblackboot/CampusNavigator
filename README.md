# 🎓 Campus Navigator 🚀

Welcome to **Campus Navigator**, your ultimate college companion! Designed primarily for freshers (but useful for everyone), this smart assistant helps you:

✅ Find where a professor is teaching 👨‍🏫📍  
✅ Locate classrooms & assignment submission points 📚📩  
✅ Track campus events 🎉📅  
✅ Discover the best food spots on campus 🍕🍔  
✅ Manage attendance & see if you can take a leave 📝❌  

Because let’s be honest—college is hard enough without having to wander around like a lost puppy! 🐶

---
## 🛠️ Tech Stack
- **Frontend:** React, Axios ⚛️
- **Backend:** Node.js, Express.js, Multer 🛠️
- **Database:** MongoDB Atlas 🗄️
- **Authentication & Security:** Bcrypt.js, Dotenv, Nodemailer 🔒

---
## 🚀 Installation

### Prerequisites
Make sure you have **Node.js** and **npm** installed (because magic needs a foundation 🏗️).

### Clone the repository
   ```sh
   git clone https://github.com/your-repo/campus-navigator.git
   cd campus-navigator
   ```
### Install dependencies:
   ```sh
   npm install
   ```
### Backend Setup
1. Navigate to the Backend directory:
   ```sh
   cd Backend
   ```
2. Create a `.env` file and add the required secrets (shhh 🤫):
   ```sh
   MONGODB_URI=your_mongodb_uri
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   PORT=your_port
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Start the React development server:
   ```sh
   npm run dev
   ```

---
## 📝 TODO (a.k.a. Stuff We Still Need to Do) 
- [x] 🔐 Improve authentication & authorization (no hackers allowed!)
- [x] 🧹 Need to clean up directory structure
- [x] ⚡ Optimize database queries for faster performance (no more lag!)
- [x] 🔐 Add admin page
- [ ] 🤖 Implement chatbot using Gemini API for better navigation
- [ ] 🎨 Develop a sleek UI for attendance tracking
- [ ] 🍽️ Expand food recommendations with user reviews (because food is life!)
- [x] 🧹 **Cleanup:** Merge frontend and backend `node_modules` into a single root `node_modules` directory. (Assigned to [@lilblackboot](https://github.com/lilblackboot) 🛠️)

---
## 🙌 Contributing
Contributions are **super welcome**! Open a pull request or report an issue, and let’s make college life a breeze. 🌬️🎓

---
## 📜 License
This project is licensed under the MIT License. That means you’re free to use, modify, and share—just don’t forget to give us a shout-out! 📢😄

