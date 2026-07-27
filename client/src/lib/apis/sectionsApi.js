import { PUBLIC_API_URL } from "$env/static/public";

const getAllSections = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/sections`, {
        credentials: "include",
    });
    return await response.json();
};

const getOneSection = async (section_id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/sections/${section_id}`, {
        credentials: "include",
    });
    return await response.json();
};

const addSection = async (section) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/sections`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(section),
    });
    return await response.json();
};

const deleteSection = async (section_id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/sections/${section_id}`, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const modifySection = async (section_id, section) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/sections/${section_id}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(section),
    });
    return await response.json();
};

export { getAllSections, getOneSection, addSection, deleteSection, modifySection };