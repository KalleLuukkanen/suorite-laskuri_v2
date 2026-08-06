import { PUBLIC_API_URL } from "$env/static/public";

const getAllPerformances = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances`, {
        credentials: "include",
    });
    return await response.json();
};

const getAllPerformancesOfPhase = async (phase_start, phase_end) => {
    const params = new URLSearchParams({ phase_start, phase_end });
    const response = await fetch(`${PUBLIC_API_URL}/api/performances/phase?${params}`, {
        credentials: "include",
    });
    return await response.json();
};

const getPhases = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances/phases`, {
        credentials: "include",
    });
    return await response.json();
};

const getOnePerformance = async (performance_id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances/${performance_id}`, {
        credentials: "include",
    });
    return await response.json();
};

const addPerformance = async (performance) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(performance),
    });
    return await response.json();
};

const deletePerformance = async (performance_id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances/${performance_id}`, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const modifyPerformance = async (performance_id, performance) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/performances/${performance_id}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(performance),
    });
    return await response.json();
};

export { getAllPerformances, getAllPerformancesOfPhase, getPhases, getOnePerformance, addPerformance, deletePerformance, modifyPerformance };