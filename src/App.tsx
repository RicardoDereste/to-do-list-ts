import { useState } from "react"
import Footer from "./components/Footer";
import Header from "./components/Header";

import styles from "./App.module.css"
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty}

    const updateItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updateItems)
    hideOrShowModal(false)
  }

  return (
    <div>
      <Modal children={<TaskForm btnText="Edit Task" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>What do you need to do?</h2>
          <TaskForm btnText="Create Task" taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div>
          <h2>Your Tasks:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
