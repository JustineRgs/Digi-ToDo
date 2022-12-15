const FormAddSection = (props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const titre = document.querySelector("#label").value;
        const description = document.querySelector("#description").value;
        const date = document.querySelector("#ended").value;

        props.handleSubmitAddForm(titre, description, date);
      }}
      className="my-5 d-flex gap-3"
      id="form-add-section"
    >
      <label htmlFor="title">Titre</label>
      <input type="text" id="label" name="title" />

      <label htmlFor="text">Texte</label>
      <input type="text" id="description" name="text" />

      <input type="date" id="ended"></input>

      <input type="submit" value="Créer une nouvelle tâche" />
    </form>
  );
};

export default FormAddSection;
