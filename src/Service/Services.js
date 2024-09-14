import axios from "axios";

export const FetchInstance = async(method, body, apiname) => {
    try {
        let url = `https://sagclapp.com/preplearn/${apiname}`
        //let url = `https://www.sagclapp.com/aswini/${apiname}`
        //let url = `https://sagc.in/preplearn_hybrid/${apiname}`
        
        // let url = `http://localhost:3008/${apiname}`
        console.log(method, `https://sagclapp.com/preplearn/`, body, apiname);
        //console.log(method, `https://www.sagclapp.com/aswini`, body, apiname);

        const Data = await axios({method: method, url: url, data:body}).then(function (response) {
            console.log(response);
            const data = response.data
            return data
          }).catch(function (error) {
            console.log(error);
            return error;
        });
        return Data
    }
    catch (error) {
        return error;   
    } 
}

//export const BASE_URL = "https://sagc.in/aswini/gpac/"