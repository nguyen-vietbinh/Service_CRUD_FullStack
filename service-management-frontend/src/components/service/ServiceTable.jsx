function ServiceTable({ services }){
    
    return (
        <table border = "1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {services.map((service) => (
                    <tr key = {service.id}>
                        <td>{service.id}</td>
                        <td>{service.name}</td>
                        <td>{service.price}</td>
                        <td>{service.status}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}
export default ServiceTable;