import * as firebase from "@firebase/testing";
import * as fs from "fs";
import * as path from "path";

const projectId = "test";

describe("test firebase", () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId,
      rules: fs.readFileSync(
        path.resolve(__dirname, "firestore.rules"),
        "utf8"
      ),
    });
  });
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId });
  });

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  test("test", async () => {
    const app = firebase.initializeTestApp({
      projectId,
      auth: { uid: "alice", email: "alice@example.com" },
    });
    const store = app.firestore();
    const result = store.collection("secure-users").doc("alice").set({
      test: "test",
    });
    await firebase.assertFails(result);
  });
});
