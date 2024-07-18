import { ServerIP ,AppName} from "./export-server";
import axios from "axios";

async function banUser(d,em) {
    try {
        const response = await axios.post(`${ServerIP}/api/database/account/update`, {
            data: d,
            e: em,
            method: "ban",
            projname: AppName
        });
        return response.data;
    } catch (error) {
        console.error("Error banning user:", error);
        throw new Error(error);
    }
}

export { banUser };