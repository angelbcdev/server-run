import { Router } from "express";
import { getAuditors, saveAuditor, saveGoal, getGoalsByYear } from "../db.js";

const routerAuditor = Router();

/**
 *  REMEMBER server has other git to update any change
 */

const ENDPOINTS = {
  AUDITOR: "/auditor",
  GOAL: "/goal",
};

routerAuditor.get("/", (req, res) => {
  setTimeout(() => {
    res.json({
      status: true,
      message:
        "Hello, World! this is the Express server running with Electron.",
    });
  }, 200);
});

routerAuditor.get(ENDPOINTS.AUDITOR, (req, res) => {
  const { dcNbr, year } = req.query;

  getAuditors(dcNbr, year)
    .then((auditors) => {
      res.json({
        status: true,
        auditors,
      });
    })
    .catch((error) => {
      console.error("Error fetching auditors:", error);
      res.status(500).json({
        status: false,
        message: "Error fetching auditors",
      });
    });
});

routerAuditor.post(ENDPOINTS.AUDITOR, (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      status: false,
      message: "Data is required",
    });
  }

  saveAuditor(data)
    .then(() => {
      res.json({
        status: true,
        message: "Data saved successfully",
      });
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      res.status(500).json({
        status: false,
        message: "Error saving data",
      });
    });
});

routerAuditor.post(ENDPOINTS.GOAL, (req, res) => {
  const { data } = req.body || {};

  if (!data) {
    return res.status(400).json({
      status: false,
      message: "Data is required",
    });
  }

  saveGoal(data)
    .then(() => {
      res.json({
        status: true,
        message: "Goal saved successfully",
      });
    })
    .catch((error) => {
      console.error("Error saving goal:", error);
      res.status(500).json({
        status: false,
        message: "Error saving goal",
      });
    });
});
routerAuditor.get(ENDPOINTS.GOAL, (req, res) => {
  const { year, dcNbr } = req.query;

  if (!year) {
    return res.status(400).json({
      status: false,
      message: "Year is required",
    });
  }

  getGoalsByYear(year, dcNbr) // Assuming year is in the format "/YYYY"
    .then((goals) => {
      res.json({
        status: true,
        goals,
      });
    })
    .catch((error) => {
      console.error("Error fetching goals:", error);
      res.status(500).json({
        status: false,
        message: "Error fetching goals",
      });
    });
});

export default routerAuditor;
