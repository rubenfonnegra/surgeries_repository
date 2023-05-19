import { useState, createContext, useContext, useEffect } from "react";
import { getSurgeriesRequests, createSurgeriesRequests, deleteSurgeryRequests, getSurgeryRequest, updatePostRequest } from "../api/surgeries";


const SurgeryContext = createContext()

export const useSurgeries = () => {
    const context = useContext (SurgeryContext)
    return context
}

export const SurgeryProvider = ({children}) => {
    const [surgeries, setSurgeries] = useState ([])

    const getSurgeries = async () => {
        const resSurgeries = await getSurgeriesRequests()
        setSurgeries(resSurgeries.data)
    }

    const createSurgery = async (surgery) => {
        try {
            const resSurgery = await createSurgeriesRequests(surgery)
            setSurgeries([...surgeries, resSurgery.data])
        } catch (error) {
            console.log(error)
        }
    }

    const deleteSurgery = async (id) => {
        const resSurgery = await deleteSurgeryRequests(id)
        if (resSurgery.status === 204) {
            setSurgeries(surgeries.filter((surgeries) => surgeries._id !== id))
        }
    }

    const getSurgery = async (id) => {
        const resSurgery = await getSurgeryRequest(id)
        return resSurgery.data
    }

    const updatePost = async ( id, surgery) => {
        const resSurgery = await updatePostRequest(id, surgery)
        console.log("////////id///////////")
        console.log(id)
        console.log("////////surgery///////////")
        console.log(surgery)
        console.log("////////res-surgery///////////")
        console.log(resSurgery)
        setSurgeries(surgeries.map(surgery => surgery._id === id ? resSurgery.data: surgery))
    }

    useEffect(() => {
        getSurgeries()
    }, [])


    return <SurgeryContext.Provider value={{
        surgeries,
        getSurgeries,
        createSurgery,
        deleteSurgery,
        getSurgery,
        updatePost
    }}>
        {children}
    </SurgeryContext.Provider>
}