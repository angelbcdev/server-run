import { MongoClient } from "mongodb";
import config from "./config.js";
/**
 *  REMEMBER server has other git to update any change
 */

const url = config.mongo_url;

const client = new MongoClient(url);

const ENDPOINTSDB = {
  DB: "warehouse",
  COLLECTION: { AUDITOR: "auditor_production", GOAL: "goal2" },
};

async function saveAuditor(params) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.AUDITOR);

    // 1️⃣ Buscar documento actual
    const existing = await collection.findOne({ id: params.id });

    if (!existing) {
      await collection.insertOne(params);
      return;
    }

    existing.positionHistory = {
      ...existing.positionHistory,
      ...params.positionHistory,
    };

    await collection.updateOne(
      { id: params.id },
      { $set: existing },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

async function getAuditors(dcNbr, year) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.AUDITOR);

    const result = await collection
      .find({ dcNbr, [`positionHistory.${year}`]: { $exists: true } })
      .toArray();

    return result;
  } catch (error) {
    console.error("Error retrieving data:", error);
  } finally {
    await client.close();
  }
}

async function saveGoal(params) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.GOAL);

    await collection.updateOne(
      { fiscalQuarter: params.fiscalQuarter, dcNbr: params.dcNbr },
      { $set: params },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error saving goal:", error);
  } finally {
    await client.close();
  }
}

async function getGoalsByYear(year, dcNbr) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.GOAL);

    const result = await collection
      .find({ year, dcNbr })
      .sort({ fiscalQuarter: 1 })
      .toArray();

    return result;
  } catch (error) {
    console.error("Error retrieving goals:", error);
  } finally {
    await client.close();
  }
}

export { saveAuditor, getAuditors, saveGoal, getGoalsByYear };
