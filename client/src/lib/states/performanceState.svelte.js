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

            let first_day;
            let last_day;

            if (d.getDate() <= 15) {
                first_day = new Date(d.getFullYear(), d.getMonth(), 1);
                last_day = new Date(d.getFullYear(), d.getMonth(), 15);
            } else {
                first_day = new Date(d.getFullYear(), d.getMonth(), 16);
                last_day = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            }

            return performanceState.filter((p) => {
                const workdate = new Date(p.workdate);

                return (
                    workdate.getFullYear() === first_day.getFullYear() &&
                    workdate.getMonth() === first_day.getMonth() &&
                    workdate.getDate() >= first_day.getDate() &&
                    workdate.getDate() <= last_day.getDate()
                );
            });
        },
        performancesOfSection: (performances, section_id) => {
            return performances.filter((p) => Number(p.worksection) === Number(section_id));
        },
        perfOfSectionAndPhase: (section_id, date) => {
            return performanceState
                .performancesOfPhase(date)
                .filter((p) => p.worksection === section_id);
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
        getOne: (id) => {
            if (performanceState === null) return null;

            return performanceState.find(
                (p) => p.id === Number(id)
            );
        },
    }
};