import { useState } from "react";

function ServiceEditForm({service, onUpdateService, onCancel}){
    const [formData, setFormData] = useState({
        name: service.name,
        price: service.price,
        status: service.status
    });

    const [errors, setErrors] = useState("");

    function handleInputChange(event){
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setErrors("");
    }

    // function handleSubmit(event){
    //     event.preventDefault();
    //     if(!formData.name || !formData.price || !formData.status){
    //         setErrors("Please fill in all fields.");
    //         return;
    //     }

    //     const updatedService = {
    //         ...service,
    //         name: formData.name,
    //         price: parseFloat(formData.price),
    //         status: formData.status
    //     };
    //     onUpdateService(updatedService);
    // }

    async function handleSubmit(event){
        event.preventDefault();
        if(!formData.name || !formData.price || !formData.status){
            setErrors("Please fill in all fields.");
            return;
        }

        const updatedService ={
            ...service,
            name: formData.name,
            price: parseFloat(formData.price),
            status: formData.status
        };

        try{
            await onUpdateService(service.id, updatedService);
        }catch(err){
            console.error("Failed to update service:", err);
            setErrors(
                "Failed to update service. Please try again."
            );
        }
    }

        return (
            <form onSubmit={handleSubmit} className="service-form">
                <h2>Edit Service</h2>
                {errors && <p className="error">{errors}</p>}
                <div className="form-group">
                    <label>Service Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Update Service</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        )
    }
     export default ServiceEditForm;
    
