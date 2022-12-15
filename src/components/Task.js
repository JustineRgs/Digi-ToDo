const Task = (props) => {
  return (
    <section className="d-flex justify-content-between border p-3 my-3">
      <h2
        className={props.task.isValidate == 1 ? "text-decoration-line-through" : ""}
      >
        {props.task.label}
      </h2>
      <p
        className={props.task.isValidate == 1 ? "text-decoration-line-through" : ""}
      >
        {props.task.description}
      </p>
      <p
        className={props.task.isValidate == 1 ? "text-decoration-line-through" : ""}
      >
        {props.task.ended}
      </p>
      <div>
        <button
          onClick={() => {
            props.handleClickValidateTask(props.index, props.task.label, props.task.description, props.task.ended);
          }}
          className="btn btn-success me-3"
        >
          Valider
        </button>
        <button
          onClick={(event) => {
            //appel du gestionnaire d'evenement -> modifier ma tache
            props.handleClickEditButton(props.index);
          }}
          className="btn btn-warning me-3"
        >
          Modifier
        </button>
        <button
          onClick={() => {
            props.handleClickDeleteTask(props.index, props.task.id);
          }}
          className="btn btn-danger me-3"
        >
          Supprimer
        </button>
      </div>
    </section>
  );
};

export default Task;
