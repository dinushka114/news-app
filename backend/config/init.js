import axios from "axios";

const url = "http://localhost:5000/api/auth";

const createSuperAdmin = async () => {
    try {
        await axios.post(`${url}`);
        console.log('Super admin created successfully');
    } catch (error) {
        console.error('Super admin already created!!');
    }
}

export default createSuperAdmin;