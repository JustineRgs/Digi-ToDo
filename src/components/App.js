import Coopernet from "./../services/Coopernet";
import { useState, useEffect } from "react";
import Task from "./Task";
import FormAddTask from "./FormAddTask";
import FormEditTask from "./FormEditTask";

const initial_value = [];

function App() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  // useState renvoie un tableau. Le premier élément de ce dernier est un état et le deuxième élément est une référence vers la fonction qui permet de modifier cet état.
  const [tasks, setTasks] = useState(initial_value);
  const [displayForm, setdisplayForm] = useState(false);
  const [displayNewTask, setdisplayNewTask] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(-1);

  const fetchTask = async () => {
    // Récupération des tâches sur le serveur :
    const server_tasks = await Coopernet.getTasks();

    // Modification du state tasks
    setTasks(server_tasks);
  };
  // Equivalent du componentDidMount si le deuxième paramètre de useEffect est []
  useEffect(() => {
    const testLocalStorageToken = async () => {
      try {
        if (await Coopernet.getStorage()) {
          await fetchTask();
        } else {
          // Je modifie le login et le mot de passe Il faudra faire en sorte d'appeler ici le component de formulaire de login
          Coopernet.setUsername("y");
          Coopernet.setPassword("y");
          await Coopernet.setOAuthToken();
          //Si ce code est exécuté, c'est que je suis bien connecté , je recupère mes taches :
          await fetchTask();
        }
      } catch (error) {
        // Ici, il faudrait afficher dans l'interface qu'il y a eu une erreur
        // d'identification et donner un email de l'administrateur par exemple
        console.error("Erreur attrapée : " + error);
      }
    };
    testLocalStorageToken();
  }, []);

  const handleClickNewTask = () => {
    setdisplayNewTask(!displayNewTask);
  };
  /**
   * CREATION D'UNE NOUVELLE TACHE
   *
   * @param {*} label titre de la tache
   * @param {*} description de la tache
   * @param {*} ended date de la tache
   */
  const handleSubmitAddForm = async (label, description, ended) => {
    const newTask = {
      label: label,
      description: description,
      ended: ended,
    };
    await Coopernet.addTask(newTask, null);
    setTasks([...tasks, newTask]);
    setdisplayNewTask(false);
  };

  /**
   * SUPPRIMER UNE TACHE
   *
   * Utilisation de la méthode filter : si l'index de la tâche cliquée correspond à l'index de la tâche, cette dernière ne passe pas le filtre
   * Appel du mutateur de l'état tasks "setTasks"
   * @param {Number} index
   */
  const handleClickDeleteTask = async (index, id) => {
    await Coopernet.deleteTask(id);
    // Teste si l'index de la tâche est bien différent de l'index de la tâche qui contient le bouton supprimer sur lequel l'internaute a cliqué
    setTasks(tasks.filter((task, i) => i != index));
  };
  /**
   * VALIDER LA TACHE
   *
   * @param {*} index
   */
  const handleClickValidateTask = async (index, label, description, ended) => {
    tasks.map((task, i) => {
      if (i === index) {
        task.label = label;
        task.description = description;
        task.ended = ended;
        task.isValidate = task.isValidate == 0 ? 1 : task.isValidate ? 0 : 0;
        Coopernet.updateTask(task, null);
      }
    });
    setTimeout(() => {
      fetchTask();
    }, 400);
  };

  /**
   * CLICK SUR BOUTON MODIFIER
   *
   * @param {*} event
   * @param {*} index
   */
  const handleClickEditButton = (index) => {
    setCurrentEditTask(index);
    setdisplayForm(!displayForm);
  };

  /**
   * MODIFICATION DE LA TACHE
   *
   * @param {*} label
   * @param {*} description
   * @param {*} ended
   */
  const handleSubmitEditTask = (label, description, ended) => {
    tasks.map((task, i) => {
      if (i === currentEditTask) {
        task.label = label;
        task.description = description;
        task.ended = ended;
        task.isValidate = task.isValidate;
        Coopernet.updateTask(task, null);
        setdisplayForm(false);
      }
    });
  };

  return (
    <div className="App container">
      <h1>Votre To-Do List</h1>
      <button
        onClick={() => {
          handleClickNewTask();
        }}
        className="btn btn-danger me-3"
      >
        Ajouter une nouvelle tâche
      </button>
      {displayNewTask && (
        <FormAddTask handleSubmitAddForm={handleSubmitAddForm} />
      )}
      {displayForm && (
        <FormEditTask handleSubmitEditTask={handleSubmitEditTask} />
      )}
      <h2 className="mt-5 mb-6">Vos tâches en cours</h2>
      {tasks
        .filter((task) => parseInt(task.isValidate) === 0)
        .map((task, index) => (
          <Task
            task={task}
            key={Math.random() * 100000}
            handleClickDeleteTask={handleClickDeleteTask}
            handleClickValidateTask={handleClickValidateTask}
            handleClickEditButton={handleClickEditButton}
            index={index}
          />
        ))}
      <h2 className="mt-5 mb-3">Vos tâches terminées</h2>
      {tasks
        .filter((task) => parseInt(task.isValidate) === 1)
        .map((task, index) => (
          <Task
            task={task}
            key={Math.random() * 100000}
            handleClickDeleteTask={handleClickDeleteTask}
            handleClickValidateTask={handleClickValidateTask}
            handleClickEditButton={handleClickEditButton}
            index={index}
          />
        ))}
    </div>
  );
}

export default App;
