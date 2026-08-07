import * as performancesApi from "../apis/performancesApi.js";

let performanceState = $state(null);

export const initPerformances = async () => {
    const performances = await performancesApi.getAllPerformances();
    performanceState = performances;
};

export const usePerformanceState = () => {
    return {
        get performances() {
            return performanceState;
        },
        get phases() {
            if (performanceState === null) return null;

            const phases = new Map();

            for (const p of performanceState) {
                const d = new Date(p.workdate);

                const start = d.getDate() <= 15 ? new Date(d.getFullYear(), d.getMonth(), 1) : new Date(d.getFullYear(), d.getMonth(), 16);
                const end = d.getDate() <= 15 ? new Date(d.getFullYear(), d.getMonth(), 15) : new Date(d.getFullYear(), d.getMonth() + 1, 0);

                phases.set(start.toISOString(), {
                    phase_start: start,
                    phase_end: end,
                });
            }
            return [...phases.values()].sort(
                (a, b) => b.phase_start - a.phase_start
            );
        },
        performancesOfPhase: (date) => {
            const d = new Date(date);
            let first_day = null;
            let last_day = null;
            if (d.getDay() <= 15) {
                first_day = new Date(d.getFullYear(), d.getMonth(), 1);
                last_day = new Date(d.getFullYear(), d.getMonth(), 15);
            } else {
                first_day = new Date(d.getFullYear(), d.getMonth(), 16);
                last_day = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            }
            return performanceState.filter((p) =>
                new Date(p.workdate) >= first_day && new Date(p.workdate) <= last_day);
        },
        performancesOfSection: (section_name) => {
            return performanceState.filter((p) => p.worksection === section_name);
        },
        create: async (performance) => {
            const created_performance = await performancesApi.addPerformance(performance);
            if (performanceState === null) {
                performanceState = [created_performance];
            } else {
                performanceState.push(created_performance);
            }
        },
        remove: async (id) => {
            const removed_performance = await performancesApi.deletePerformance(id);
            performanceState = performanceState.filter((p) => p.id !== id);
        },
        modify: async (id, performance) => {
            const modified_performance = await performancesApi.modifyPerformance(id, performance);
            performanceState = performanceState.map((p) => p.id === id ? modified_performance : p);
        },
    }
};