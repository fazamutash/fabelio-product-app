import React, { Fragment, useState } from "react";

const InputLink = (props) => {
  const [link, setLink] = useState("");
  const [disable, setDisable] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setDisable(true);
    try {
      const body = { link };
      const response = await fetch("/api/fabelio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.message);
      }
      if (response.status !== 200) alert(data.message)
      setDisable(false);
      props.goToDetailPage(data.product.id);
    } catch (err) {
      alert(err);
      setDisable(false);
      console.error(err);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Link</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add link"
          className="form-control"
          value={link}
          disabled={disable}
          onChange={(e) => setLink(e.target.value)}
        />
        <button className="btn btn-success" disabled={disable}>Submit</button>
      </form>
    </Fragment>
  );
};

export default InputLink;
