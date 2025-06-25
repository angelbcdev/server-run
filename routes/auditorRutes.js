import { Router } from "express";
import { getAuditors, saveAuditor, saveGoal, getGoalsByYear } from "../db.js";

const routerAuditor = Router();

routerAuditor.get("/", (req, res) => {
  setTimeout(() => {
    res.json({
      status: true,
      message:
        "Hello, World! this is the Express server running with Electron.",
    });
  }, 200);
});

routerAuditor.get("/auditor", (req, res) => {
  getAuditors()
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

routerAuditor.post("/auditor", (req, res) => {
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

routerAuditor.post("/goal", (req, res) => {
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
routerAuditor.get("/goal/:year", (req, res) => {
  // const { year } = req.params;
  const { year } = req.params; // If you want to use query parameters instead

  if (!year) {
    return res.status(400).json({
      status: false,
      message: "Year is required",
    });
  }

  getGoalsByYear(year.slice(1)) // Assuming year is in the format "/YYYY"
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
