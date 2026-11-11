function ServiceCard({ service, onDelete, onEdit}){
    return (
        <div className="service-card">
            <h3>{service.name}</h3>
            <p>Service ID: {service.id}</p>
            <p>Price: {service.price} VND</p>
            <p>Status: {service.status}</p>

            <button onClick={() => onEdit(service)}>
                Edit
            </button>

            <button onClick={() => onDelete(service.id)}>
                Delete
            </button>
        </div>
    )
}
export default ServiceCard