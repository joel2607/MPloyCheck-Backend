import type { Express } from "express";
import connectToDB from "./db";
import initExpress from "./express";
import initStorage from "./storage";

function loadServer(app: Express): void {
  void connectToDB();
  initExpress(app);
  initStorage();
}

export default loadServer;
