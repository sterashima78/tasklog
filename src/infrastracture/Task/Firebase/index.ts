import { fireStore } from "/@/infrastracture/Firebase";
import { getUser } from "../../Auth/Firebase";

import { TaskStorage, Task, createId } from "/@/domain/Task";
const converter = (id: string) => ({
  toFirestore(task: Task): firebase.firestore.DocumentData {
    return {
      uid: id,
      name: task.name,
      type: task.type,
      isDeleted: false,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Required<Task> {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      name: data.name,
      type: data.type,
    };
  },
});
export const storage: TaskStorage = {
  async get() {
    const user = await getUser();
    if (user === undefined) return [];
    const snapshot = await fireStore
      .collection("tasks")
      .where("uid", "==", user.id)
      .where("isDeleted", "==", false)
      .withConverter(converter(user.id))
      .get();
    return snapshot.docs.map((i) => i.data());
  },
  async add(tmpTask) {
    const user = await getUser();
    if (user === undefined) return [];
    const task =
      tmpTask.id === undefined || tmpTask.id === ""
        ? { ...tmpTask, id: createId() }
        : tmpTask;
    const ref = await fireStore
      .collection("tasks")
      .withConverter(converter(user.id))
      .doc(task.id);
    if (tmpTask.id === undefined || tmpTask.id === "") {
      ref.set(task);
    } else {
      ref.update(task);
    }
    return storage.get();
  },
  async remove(id) {
    const user = await getUser();
    if (user === undefined) return [];
    if (id === "") return storage.get();
    await fireStore
      .collection("tasks")
      .withConverter(converter(user.id))
      .doc(id)
      .update({
        isDeleted: true,
      });
    return storage.get();
  },
};
