import express from "express";
import {
  getAdWeeklyReports,
  addAdWeeklyReport,
  deleteAdWeeklyReport,
  getAppRankings,
  updateAppRanking,
  getBookRankings,
  updateBookRankings,
  getDB,
  setDB,
  getSources,
  getAdBookDetail,
  getBookList,
} from "./service.mjs";
import { restart } from "./service.mjs";

const app = express();
const port = 8088;
app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send();
});

app.use(express.json()); // for parsing application/json
//周报列表
app.get("/api/tw/ad-weekly-reports", (req, res) => {
  try {
    const list = getAdWeeklyReports();
    sendData(res, {
      total: list.length,
      list,
    });
  } catch (error) {
    sendCatch(res, error);
  }
});
app.post("/api/tw/ad-weekly-reports", (req, res) => {
  const data = req.body;
  try {
    addAdWeeklyReport(data);
    sendData(res, "success");
  } catch (error) {
    sendCatch(res, error);
  }
});
app.delete("/api/tw/ad-weekly-reports/:id", (req, res) => {
  const { id } = req.params;
  deleteAdWeeklyReport(id);
  sendData(res, "success");
});
//周报的APP排行列表
app.get("/api/tw/ad-weekly-reports/:id/app-rank-detail", (req, res) => {
  try {
    const { id } = req.params;
    const list = getAppRankings(id);
    sendData(res, { list });
  } catch (error) {
    sendCatch(res, error);
  }
});
app.post("/api/tw/ad-weekly-reports/:id/app-rank-upload", (req, res) => {
  try {
    const { id } = req.params;
    const data = updateAppRanking(id);
    sendData(res, data);
  } catch (error) {
    sendCatch(res, error);
  }
});
//周报的书列表
app.get("/api/tw/ad-weekly-reports/:id/book-rank-detail", (req, res) => {
  try {
    const { id } = req.params;
    const list = getBookRankings(id);
    sendData(res, {
      list,
    });
  } catch (error) {
    sendCatch(res, error);
  }
});
app.post("/api/tw/ad-weekly-reports/:id/book-rank-upload", (req, res) => {
  try {
    const { id } = req.params;
    const data = updateBookRankings(id);
    sendData(res, data);
  } catch (error) {
    sendCatch(res, error);
  }
});
//素材列表
app.get("/api/tw/test-adbrief", (req, res) => {
  try {
    const list = getSources();
    sendData(res, { list });
  } catch (error) {
    sendCatch(res, error);
  }
});
//素材书目详情
app.get("/api/tw/adbook/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = getAdBookDetail(id);
    sendData(res, data);
  } catch (error) {
    sendCatch(res, error);
  }
});
app.post("/api/tw/saleable-books/search", (req, res) => {
  try {
    const list = getBookList();
    sendData(res, { list });
  } catch (error) {
    sendCatch(res, error);
  }
});
//数据库调整
app.get(/db/, (req, res) => {
  const db = getDB();
  sendData(res, db);
});
app.post(/db/, (req, res) => {
  try {
    const { data: db } = req.body;
    setDB(db);
    sendData(res, db);
  } catch (err) {
    restart();
    console.log(err);
    sendData(res, err.message);
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function sendData(res, data) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    code: 0,
    data,
  });
}

function sendCatch(res, error) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    code: -1,
    message: error.message,
  });
}
