export default function Table({ children, head, body, rows }) {
    function createMarkup(html) {
        return { __html: html };
    }
    function createTress(rows) {

        return <p>{rows}</p>
    }

    let trees;
    trees = createTress(rows);
    return (
        <section className="table-parent">
            <table>
                <thead>
                    <tr className="head">
                        <th className="title bold" colSpan="2">{head.title}</th>
                    </tr>
                    <tr>
                        <th colSpan="2" dangerouslySetInnerHTML={createMarkup(head.content)} />
                    </tr>
                </thead>
                <tbody>
                    <tr className="head">
                        <td className="title bold" colSpan="2">{body.title}</td>
                    </tr>
                    {rows.map((row, index) => (
                        <tr key={`${row.title}-${index}`}>
                            <td width="20%"><div dangerouslySetInnerHTML={createMarkup(row.title)} /> </td>
                            <td width="80%"><div dangerouslySetInnerHTML={createMarkup(row.body)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}