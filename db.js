import { MongoClient } from "mongodb";
import config from "./config.js";
// Use path.resolve for cross-platform compatibility

const url = config.mongo_url;

const client = new MongoClient(url);

const ENDPOINTSDB = {
  DB: "warehouse",
  COLLECTION: { AUDITOR: "auditor_production", GOAL: "goal2" },
};

async function main() {
  try {
    await client.connect();
    // const collections = await client.db("TodoList").collections(); // get all collections
    const collections = await client
      .db(ENDPOINTSDB.DB)
      .collection("auditor")
      .find()
      .toArray();

    const db = client.db("TodoList");
    const collection = db.collection("user");
    const result = collection.find();
    const user = await result.toArray();
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.close();
  }
}

async function saveAuditor(params) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.AUDITOR);

    console.log("params.positionHistory", params.positionHistory);

    await collection.updateOne(
      { id: params.id },
      { $set: params },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

async function getAuditors(dcNbr) {
  try {
    await client.connect();
    const db = client.db(ENDPOINTSDB.DB);
    const collection = db.collection(ENDPOINTSDB.COLLECTION.AUDITOR);

    const result = await collection.find({ dcNbr }).toArray();

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
      { fiscalQuarter: params.fiscalQuarter },
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
