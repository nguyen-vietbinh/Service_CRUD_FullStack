function ServiceSummary({ totalServices, activeServices}){
    return (
        <div className="service-summary">
            <div className="summary-card">
                <h3>Total Services</h3>
                <h1>{totalServices}</h1>
            </div>

            <div className="summary-card">
                <h3>Active Services</h3>
                <h1>{activeServices}</h1>
            </div>
        </div>
    )
}

export default ServiceSummary;