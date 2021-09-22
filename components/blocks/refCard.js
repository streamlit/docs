import Router from 'next/router'

export default function RefCard({ children, size, href }) {
    const followLink = (e) => {
        const isCopyButton = e.target.type === 'button';
        
        if(isCopyButton) {
            return;
        } else {
            Router.push(href);
        };
    }

    return (
        <div className={`not-link reference-card ${size || 'third'}`} onClick={(e) => followLink(e)}>
            {children}
        </div>
    )
}
