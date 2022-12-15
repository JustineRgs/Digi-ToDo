const FormEditTask = (props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const titre = document.querySelector("#labela").value;
        const description = document.querySelector("#descriptiona").value;
        const date = document.querySelector("#endeda").value;

        props.handleSubmitEditTask(titre, description, date);
      }}
      className="my-5 d-flex gap-3"
      id="form-add-section"
    >
      <label htmlFor="title">Titre</label>
      <input type="text" id="labela" name="title" />

      <label htmlFor="text">Texte</label>
      <input type="text" id="descriptiona" name="text"/>

      <input type="date" id="endeda"></input>

      <input type="submit" value="Modifier"/>
    </form>
  );
};

export default FormEditTask;
