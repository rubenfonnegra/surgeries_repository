import axios from "axios";

export const getSurgeriesRequests = async () => await axios.get('http://localhost:4000/surgeries')

export const createSurgeriesRequests = async (surgery) =>{
    const form = new FormData()

    for (let key in surgery) {
        console.log("///////key-form////////////",key)
        console.log("///////surgery-form////////////",surgery)
        form.append(key, surgery[key])        
    }
    console.log("///////newFields////////////",surgery)
    console.log("///////formulario////////////",form)
    return await axios.post('http://localhost:4000/surgeries', form,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const deleteSurgeryRequests = async id => await axios.delete('http://localhost:4000/surgeries/' + id)

export const getSurgeryRequest = async id => await axios.get('http://localhost:4000/surgeries/' + id)


//-------------------------------------------

export const updatePostRequest = async (id, newFields) => {
    const form = new FormData()

    for (let key in newFields) {
        console.log("///////key-form////////////",key)
        console.log("///////newFields-form////////////",newFields)
        form.append(key, newFields[key])        
    }
    console.log("///////newFields////////////",newFields)
    console.log("///////formulario////////////",form)
    return await axios.put(`http://localhost:4000/surgeries/${id}`, form)
}

