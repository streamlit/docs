
export default function RefCard({ children, size }) {
    return (
        <section className={`reference-card ${size || 'third'}`}>
            {children}
        </section >
    )
}