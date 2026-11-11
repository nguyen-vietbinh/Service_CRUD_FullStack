function ServiceFilter({searchTerm, onSearchChange, statusFilter, onStatusChange}){
    return(
        <div className="service-filter">
            <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
                <option value="ALL">All</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
        </div>
    )
}
export default ServiceFilter;