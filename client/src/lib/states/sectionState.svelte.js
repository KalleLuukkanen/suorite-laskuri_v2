import * as sectionsApi from "../apis/sectionsApi.js";

let sectionState = $state(null);

export const initSections = async () => {
    const sections = await sectionsApi.getAllSections();
    sectionState = sections;
};

export const useSectionState = () => {
    return {
        get sections() {
            return sectionState;
        },
        getOne: (section_id) => {
            if (sectionState === null) return null;
            return sectionState.find((s) => Number(s.id) === Number(section_id));
        },
        create: async (section) => {
            const new_section = await sectionsApi.addSection(section);
            sectionState.push(new_section);
        },
        remove: async (id) => {
            const removed_section = await sectionsApi.deleteSection(id);
            sectionState = sectionState.filter((s) => s.id !== id);
        },
        removeAll: async () => {
            await sectionsApi.deleteAllSections();
            sectionState = [];
        },
        modify: async (id, section) => {
            const modified_section = await sectionsApi.modifySection(id, section);
            sectionState = sectionState.map((s) => s.id === id ? modified_section : s);
        },
    }
};