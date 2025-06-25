import { MongoClient } from "mongodb";
import config from "./config.js";
// Use path.resolve for cross-platform compatibility

const url = config.mongo_url;

const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    // const collections = await client.db("TodoList").collections(); // get all collections
    const collections = await client
      .db("warehouse")
      .collection("auditor")
      .find()
      .toArray();

    const db = client.db("TodoList");
    const collection = db.collection("user");
    const result = collection.find();
    const user = await result.toArray();
    // const result = await collection.insertOne({
    //   name: "angel",
    //   age: 20,
    //   status: "A",
    //   groups: ["Sports", "Dance", "Music"],
    // });

    console.log("Connected successfully to server");

    // console.log("collections", user[0].groups);

    // collections.forEach((element) => {
    //   console.log("element--", element);
    // });
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.close();
  }
}

async function saveAuditor(params) {
  try {
    await client.connect();
    const db = client.db("warehouse");
    const collection = db.collection("auditor");

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

async function getAuditors() {
  try {
    await client.connect();
    const db = client.db("warehouse");
    const collection = db.collection("auditor");

    const result = await collection.find().toArray();

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
    const db = client.db("warehouse");
    const collection = db.collection("goal");

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

async function getGoalsByYear(date) {
  try {
    await client.connect();
    const db = client.db("warehouse");
    const collection = db.collection("goal");

    const result = await collection
      .find({ idYear: date })
      .sort({ fiscalQuarter: 1 })
      .toArray();

    return result;
  } catch (error) {
    console.error("Error retrieving goals:", error);
  } finally {
    await client.close();
  }
}

// getGoalsByYear("2024")
//   .then((goals) => {
//     console.log("Goals for 2023:", goals.length);
//   })
//   .catch((error) => {
//     console.error("Error fetching goals:", error);
//   });

export { saveAuditor, getAuditors, saveGoal, getGoalsByYear };
