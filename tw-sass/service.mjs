import {
  adWeeklyReports,
  appRankings,
  bookRankings,
  appRankingsBk,
  bookRankingsBk,
  sourceMaterial,
  bookList
} from "./model.mjs";
const db = {};
restart();
export function restart() {
  setDB({
    ...{
      adWeeklyReports,
      appRankings,
      bookRankings,
      sourceMaterial,
    },
  });
}
export function getDB() {
  return db;
}
export function setDB(data) {
  Object.assign(db, data);
}
export function getAdWeeklyReports() {
  return db.adWeeklyReports;
}
export function addAdWeeklyReport(data) {
  const newData = {
    name: Object.values(data).join("-"),
    id: db.adWeeklyReports.length + 1 + "",
  };
  db.adWeeklyReports.unshift(newData);
}
export function deleteAdWeeklyReport(reportId) {
  const index = db.adWeeklyReports.findIndex((item) => item.id == reportId);
  if (index < 0) throw "找不到";
  db.adWeeklyReports.splice(index, 1);
}
export function getAppRankings(reportId) {
  return db.appRankings.filter((item) => item.reportId == reportId);
}
export function updateAppRanking(reportId) {
  const ranking = db.appRankings.find((item) => (item.reportId = reportId));
  if (!ranking) throw "找不到";
  //todo 修改逻辑看自己处理标志
  return ranking;
}
export function getBookRankings(reportId) {
  return db.bookRankings.filter((item) => item.reportId == reportId);
}
export function updateBookRankings(reportId) {
  const ranking = db.bookRankings.find((item) => (item.reportId = reportId));
  if (!ranking) throw "找不到";
  //todo 修改逻辑看自己处理标志
  return ranking;
}
export function setItem(id, typeItem) {
  const obj = getList().find((item) => item.typeId == id);
  if (!obj) throw "不存在该id";
  Object.assign(obj, typeItem);
}
//广告素材
export function getSources() {
  return sourceMaterial;
}
//书籍详情
export function getAdBookDetail(id) {
  const originObj = bookRankingsBk.find((item) => item.id == id);
  let newObj = {
    alias: [
      "Los Juegos Del Destino",
      "Los Juegos Del Destino",
      "Los Juegos Del Destino",
      "Los Juegos Del Destino",
    ],
    covers: [originObj.cover],
    name: originObj.bookName,
    description:
      "Qué dolor... ¡En la mañana! Al despertarse por la luz del sol, Valeria Escoto abrió los ojos sintiendo un terrible dolor de cabeza...",
    genre: "ceo",
    placed: {
      ads: ["awdtgewry"],
      apps: originObj.appList,
      end: originObj.latestDate,
      start: originObj.earliestDate,
    },
    urls: [
      "https://www.figma.com/file/HW9eDtqM3DOaZM5gj8RQqY/%E5%87%BA%E6%B5%B7%E5%B9%B3%E5%8F%B0?node-id=8051%3A49560",
    ],
  };
  return Object.assign({}, originObj, newObj);
}
export function getBookList() {
  return bookList;
}
