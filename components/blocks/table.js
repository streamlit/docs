import React from "react";

const Table = ({
  head,
  body,
  bodyRows,
  foot,
  footRows,
  additionalClass,
  footers = [],
}) => {
  const createMarkup = (html) => {
    return { __html: html };
  };
  const createTrees = (rows) => {
    return <p>{rows}</p>;
  };

  let trees;
  let thead;
  let tbody;
  let tfoot;

  trees = createTrees(bodyRows);

  if (body && body.title) {
    tbody = (
      <React.Fragment>
        <tr className="head">
          <td className="title bold" colSpan="2">
            {body.title}
          </td>
        </tr>
        {bodyRows.map((row, index) => (
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

  if (head && head.title) {
    thead = (
      <React.Fragment key="thead">
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
      </React.Fragment>
    );
  }

  if (foot && foot.title) {
    tfoot = (
      <React.Fragment key="tbody">
        <tr className="head">
          <td className="title bold" colSpan="2">
            {foot.title}
          </td>
        </tr>
        {footRows.map((row, index) => (
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
      <table className={additionalClass}>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
        <tfoot>{tfoot}</tfoot>
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
