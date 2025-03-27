import type { Express } from "express";
import connectToDB from "./db";
import initExpress from "./express";

function loadServer(app: Express): void {
  void connectToDB();
  initExpress(app);
}

export default loadServer;
