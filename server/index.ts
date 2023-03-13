import express from "express";
import cors from "cors";
import path from "path";
import apiRouter from "./router/apiRouter";

const isDev = process.env.NODE_ENV !== "production";
const staticUrl = isDev ? "../client/build" : "../client";

console.log(process.env.NODE_ENV);
console.log(isDev);

const app = express();
const PORT = isDev ? 4002 : 3001;

// cors 이슈 방지
app.use(cors());
// 프론트 상에서의 json 파일 인식
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Client 정적파일 설정
app.use(express.static(path.join(__dirname, staticUrl)));

// API 서버 라우터 지정
app.use("/api", apiRouter);
// Root Client 라우터 지정
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, staticUrl + "/index.html"));
});
app.listen(PORT, () => {
  console.log(`server is Running -> http://localhost:${PORT}`);
});
