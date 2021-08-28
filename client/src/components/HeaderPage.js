import React, { Fragment }  from "react";

const HeaderPage = (props) => {
  return (
    <Fragment>
      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 bd-highlight btn" onClick={() => props.changePage('main')}>Main Page</div>
        <div className="p-2 bd-highlight btn" onClick={() => props.changePage('history')}>History Page</div>
      </div>
    </Fragment>
  )
}

export default HeaderPage;
