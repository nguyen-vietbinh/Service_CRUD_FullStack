import { useState } from "react";

function ServiceForm({ onAddService }) {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        status: "ACTIVE"
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
        setError("");
    }

    const [error, setError] = useState("");

    // function handleSubmit(event){
    //     event.preventDefault();
    //     if(!formData.name.trim()){
    //         setError("Service name is required");
    //         return;
    //     }
    //     if(formData.price === "" || Number(formData.price) <= 0){
    //         setError("Price must be a positive number");
    //         return;
    //     }

    //     const newService = {
    //         id: Date.now(),
    //         name: formData.name.trim(),
    //         price: Number(formData.price),
    //         status: formData.status
    //     }

    //     onAddService(newService);

    //     setFormData({
    //         name: "",
    //         price: "",
    //         status: "ACTIVE"
    //     })
    //     setError("");
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.name.trim()) {
            setError("Service name is required");
            return;
        }

        if (formData.price === "" || Number(formData.price) <= 0) {
            setError("Price must be a positive number");
            return;
        }

        const newService = {
            name: formData.name.trim(),
            price: Number(formData.price),
            status: formData.status
        };

        try {
            await onAddService(newService);

            setFormData({
                name: "",
                price: "",
                status: "ACTIVE"
            });

            setError("");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create service. Please try again."
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="service-form">
            <h2>Add New Service</h2>

            <div className="form-group">
                <label>Service Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Add Service</button>
        </form>
    );
}

export default ServiceForm;