import ServiceCard from "../components/service/ServiceCard";
import ServiceSummary from "../components/service/ServiceSummary";
import ServiceForm from "../components/service/ServiceForm";
import ServiceEditForm from "../components/service/ServiceEditForm";
import ServiceFilter from "../components/service/ServiceFilter";

import { useEffect, useState } from "react";
import { getAllServices, createService, updateService, deleteService } from "../services/serviceApi";

function ServiceListPage() {

    //  const [services, setServices] = useState([
    //         { id: 1, name: "Website Design", price: 5000000, status: "ACTIVE" },
    //         { id: 2, name: "SEO Service", price: 3000000, status: "ACTIVE" },
    //         { id: 3, name: "Hosting", price: 1000000, status: "INACTIVE" }
    //     ]);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingService, setEditingService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                setError("");

                const data = await getAllServices();

                setServices(data);
            } catch (err) {
                console.error("Failed to fetch services:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load services. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    // 2. Kiểm tra trạng thái Loading
    if (loading) {
        return <p>Loading services...</p>;
    }

    // 3. Kiểm tra trạng thái Error
    if (error) {
        return <p>{error}</p>;
    }

    const totalServices = services.length;
    const activeServices = services.filter(service => service.status == 'ACTIVE').length;

    // function handleDeleteService(serviceId){
    //     const updatedServices = services.filter((service) => service.id !== serviceId);
    //     setServices(updatedServices);

    //     if(editingService?.id === serviceId){
    //         setEditingService(null);
    //     }
    // }

    async function handleDeleteService(serviceId) {
        try {
            await deleteService(serviceId);

            setServices((prevServices) =>
                prevServices.filter(
                    (service) => service.id !== serviceId
                )
            );

            if (editingService?.id === serviceId) {
                setEditingService(null);
            }

        } catch (err) {
            console.error("Failed to delete service:", err);
            alert(
                err.response?.data?.message ||
                "Failed to delete service. Please try again."
            );
        }
    }

    // function handleAddService(newService){
    //     setServices((preServices) => [
    //         ...preServices,
    //         newService
    //     ])
    // }

    async function handleAddService(serviceData) {
        try {
            const createdService = await createService(serviceData);
            setServices((prevServices) => [
                ...prevServices,
                createdService
            ])
        } catch (err) {
            console.error("Failed to create service:", err);
            
            throw err;
        }
    }

    function handleEditService(service) {
        setEditingService(service);
    }

    // function handleUpdateService(updateService){
    //     setServices((prevServices) =>
    //         prevServices.map((service) =>
    //             service.id === updateService.id ? updateService : service
    //         )
    //     );
    //     setEditingService(null);
    // }

    async function handleUpdateService(serviceId, updatedService) {
        try {
            const result = await updateService(serviceId, updatedService);
            setServices((preServices) => preServices.map((service) => service.id === result.id ? result : service));
            setEditingService(null);

        } catch (err) {
            console.error("Failed to update service:", err);
            throw err;
        }
    }

    const filteredServices = services.filter((service) => {

        const matchesSearchTerm = service.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        const matchesStatusFilter = statusFilter === "ALL" || service.status === statusFilter;
        return matchesSearchTerm && matchesStatusFilter;
    })

    function handleClearFilter() {
        setSearchTerm("");
        setStatusFilter("ALL");
    }

    return (
        <div>
            <h1>Service Management</h1>

            <ServiceSummary totalServices={totalServices}
                activeServices={activeServices}
            />

            <ServiceForm onAddService={handleAddService} />

            {editingService && (<ServiceEditForm
                key={editingService.id}
                service={editingService}
                onUpdateService={handleUpdateService}
                onCancel={() => setEditingService(null)}
            />)}

            <ServiceFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <button onClick={handleClearFilter}>Clear Filter</button>
            <h2>Service List</h2>


            <div className="service-list">
                {
                    filteredServices.length > 0 ? (filteredServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onDelete={handleDeleteService}
                            onEdit={handleEditService}
                        />
                    ))) : (<p>No services found.</p>)
                }
            </div>

        </div>
    )
}

export default ServiceListPage;