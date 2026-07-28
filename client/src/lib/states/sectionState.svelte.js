import * as sectionsApi from "../apis/sectionsApi.js";

let sectionState = $state([]);

export const initSections = async () => {
    const sections = await sectionsApi.getAllSections();
    sectionState = sections;
};

export const useSectionState = () => {
    return {
        get sections() {
            return sectionState;
        },
        create: async (section) => {
            const new_section = await sectionsApi.addSection(section);
            sectionState.push(new_section);
        },
        remove: async (id) => {
            const removed_section = await sectionsApi.deleteSection(id);
            sectionState = sectionState.filter((s) => s.id !== id);
        },
        modify: async (id, section) => {
            const modified_section = await sectionsApi.modifySection(id, section);
            sectionState = sectionState.map((s) => s.id === id ? modified_section : s);
        },
    }
};