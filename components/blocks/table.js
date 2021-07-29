import React from "react"

export default function Table({ children, head, body, rows, addtionalClass, footers=[] }) {
    function createMarkup(html) {
        return { __html: html };
    }
    function createTress(rows) {

        return <p>{rows}</p>
    }

    let trees
    let tbody

    trees = createTress(rows);

    if (body && body.title) {
        tbody = (
            <React.Fragment>
                <tr className="head">
                    <td className="title bold" colSpan="2">{body.title}</td>
                </tr>
                {rows.map((row, index) => (
                    <tr key={`${row.title}-${index}`}>
                        <td width="20%"><div dangerouslySetInnerHTML={createMarkup(row.title)} /> </td>
                        <td width="80%"><div dangerouslySetInnerHTML={createMarkup(row.body)} /></td>
                    </tr>
                ))}
            </React.Fragment>
        )
    }

    return (
        <section className="table-parent">
            <table className={addtionalClass}>
                <thead>
                    <tr className="head">
                        <th className="title bold" colSpan="2">{head.title}</th>
                    </tr>
                    <tr>
                        <th colSpan="2" dangerouslySetInnerHTML={createMarkup(head.content)} />
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                    {footers.map((footer, index) => {
                        const body = footer.jsx ? footer.body : (<div dangerouslySetInnerHTML={createMarkup(footer.body)} />)
                        return (<React.Fragment key={`footer-${index}`}>
                            <tr className="head">
                                <td className="title bold" colSpan="2">{footer.title}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className='has-example'>{body}</td>
                            </tr>
                        </React.Fragment>)
                    })}
                </tbody>
            </table>
        </section>
    )
}
