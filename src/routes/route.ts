import type { FastifyReply, FastifyRequest } from "fastify";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export async function getVariable(req: FastifyRequest, reply: FastifyReply) {
  const data = req.body as { avalue: string };
  let avalue = null;
  let promise = await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS variables(id INTEGER PRIMARY KEY AUTOINCREMENT,avalue TEXT)"
      );
      db.run("INSERT INTO variables (avalue) VALUES (?)", data.avalue);

      db.get("SELECT * FROM variables ORDER BY id DESC", (error, row) => {
        resolve(row);
      });
    });
  });

  return {
    value: promise,
  };
}
