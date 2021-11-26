import React from "react";

const Table = ({ head, body, rows, addtionalClass, footers = [] }) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  const createTrees = (rows) => {
    return <p>{rows}</p>;
  };

  let trees;
  let tbody;

  trees = createTrees(rows);

  if (body && body.title) {
    tbody = (
      <React.Fragment>
        <tr className="head">
          <td className="title bold" colSpan="2">
            {body.title}
          </td>
        </tr>
        {rows.map((row, index) => (
          <tr key={`${row.title}-${index}`}>
            <td width="20%">
              <div dangerouslySetInnerHTML={createMarkup(row.title)} />{" "}
            </td>
            <td width="80%">
              <div dangerouslySetInnerHTML={createMarkup(row.body)} />
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  }

  return (
    <section className="table-parent">
      <table className={addtionalClass}>
        <thead>
          <tr className="head">
            <th className="title bold" colSpan="2">
              {head.title}
            </th>
          </tr>
          <tr>
            <th
              colSpan="2"
              dangerouslySetInnerHTML={createMarkup(head.content)}
            />
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
      {footers.map((footer, index) => {
        const body = footer.jsx ? (
          footer.body
        ) : (
          <section dangerouslySetInnerHTML={createMarkup(footer.body)} />
        );
        return (
          <React.Fragment key={`footer-${index}`}>
            <section className="footer">
              <h4 className="title bold" colSpan="2">
                {footer.title}
              </h4>
              {body}
            </section>
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default Table;
