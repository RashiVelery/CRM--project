import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });  
    const [editId, setEditId] = useState(null)
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const fetchCustomers = async () => {
        const res = await API.get("/customers");
        setCustomers(res.data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = async (e) => {
        e.preventDefault();
        await API.post("/customers", form);
        fetchCustomers();
    };

    const deleteCustomer = async (id) => {
        await API.delete(`/customers/${id}`);
        fetchCustomers();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        window.location.href = "/";
    };

    

    return (
        <div className="container mt-4">
            <h2>CRM Dashboard</h2>
            {user && <p>Welcome, {user.name} 👋</p>}
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
            <hr />
            <br />
            <form onSubmit={addCustomer} className="mb-4">
                <input className="form-control mb-2" placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="form-control mb-2" placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="form-control mb-2" placeholder="Phone"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="form-control mb-2" placeholder="Company"
                    onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <button className="btn btn-success">Add Customer</button>
            </form>

            <ul className="list-group">
                {customers.map((c) => (
                    <li key={c._id} className="list-group-item d-flex justify-content-between">
                        {c.name} - {c.email}
                       
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteCustomer(c._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;