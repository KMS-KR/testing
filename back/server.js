const express = require('express');
const cors = require('cors');
const todoRoutes = require('./todoRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://testing-front.onrender.com" // 프론트 Render URL로 변경
}));
app.use(express.json());
app.use('/todos', todoRoutes);

// 서버 상태 확인용 root route 추가
app.get("/", (req, res) => {
  res.send("Server running");
});

app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Todo backend running on http://localhost:${PORT}`);
});
