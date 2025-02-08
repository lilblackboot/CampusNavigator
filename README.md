# 🤖 Academic Chatbot - Find Your Professor Easily!

## 📌 Overview

This chatbot helps students find their professors based on an academic schedule 📚. It allows users to search for professors using **partial names**, **time-based queries**, and **classroom schedules** while ensuring ease of use and privacy. The chatbot is powered by the **Gemini API** and uses **JSON data** for academic schedules.

## 📜 JSON Data Schema

The chatbot fetches data from a JSON file (`schedule.json`). The schema is structured as follows:

```json
{
  "professors": [
    {
      "name": "<Professor Name>",
      "subjects": [
        {
          "name": "<Subject Name>",
          "schedule": [
            { "day": "<Day>", "time": "<Time>", "room": "<Room Number>" }
          ]
        }
      ]
    }
  ]
}
```

### 🔹 Schema Details

- **`professors`**: A list containing professor details.
  - **`name`**: Full name of the professor.
  - **`subjects`**: A list of subjects the professor teaches.
    - **`name`**: Name of the subject.
    - **`schedule`**: A list of class schedules.
      - **`day`**: The day of the week when the class takes place.
      - **`time`**: The time slot for the class.
      - **`room`**: The classroom where the class is held.

## 📜 License

This project is **MIT licensed**.

## 💡 Future Enhancements

- ✅ **Web-based UI** 🌐

---

🚀 Happy Coding! 🎓

