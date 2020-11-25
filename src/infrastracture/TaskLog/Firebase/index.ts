import { fireStore } from "../../Providers/Firebase";
import { getUser } from "../../Auth/Firebase";
import { TaskLogStorage, TaskLog, createId } from "../../../domain/Task";

const converter = (id: string) => ({
  toFirestore(task: Required<TaskLog>): firebase.firestore.DocumentData {
    return {
      uid: id,
      id: task.id,
      date: task.date,
      task: task.task,
      value: task.value,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Required<TaskLog> {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      date: data.date,
      task: data.task,
      value: data.value,
    };
  },
});
export const storage: TaskLogStorage = {
  async get() {
    const user = await getUser();
    if (user === undefined) return [];
    const snapshot = await fireStore
      .collection("taskLogs")
      .where("uid", "==", user.id)
      .withConverter(converter(user.id))
      .get();
    return snapshot.docs.map((i) => i.data());
  },
  async save(tmpTaskLog) {
    const user = await getUser();
    if (user === undefined) return [];
    const task =
      tmpTaskLog.id === undefined || tmpTaskLog.id === ""
        ? { ...tmpTaskLog, id: createId() }
        : tmpTaskLog;
    const ref = await fireStore
      .collection("taskLogs")
      .withConverter(converter(user.id))
      .doc(task.id);
    if (tmpTaskLog.id === undefined || tmpTaskLog.id === "") {
      ref.set(task);
    } else {
      ref.update(task);
    }
    return storage.get();
  },
};
