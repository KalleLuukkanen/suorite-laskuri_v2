const sum = (arr) => {
    return arr.reduce((sum, arr_element) => sum + Number(arr_element), 0)
};

const get_performance_hours = (performances) => {
    return performances.map((p) => p.performance_hours);
}

const get_spent_hours = (performances) => {
    return performances.map((p) => p.hours_spent);
}

export const calcEfficiency = (performances) => {
    if (performances.length === 0) {
        return 0;
    }
    const performance_hours = get_performance_hours(performances);
    const spent_hours = get_spent_hours(performances);
    if (performance_hours.length !== spent_hours.length) {
        throw new Error("Arrays must have same length.");
    }
    const total_p_hours = sum(performance_hours);
    const total_spent_hours = sum(spent_hours);
    const efficiency = total_p_hours / (total_spent_hours * (7.25 / 8));
    return efficiency * 100;
};

export const hours_needed = (performances, eff_goal) => {
    const performance_hours = get_performance_hours(performances);
    const spent_hours = get_spent_hours(performances);
    if (performance_hours.length !== spent_hours.length) {
        throw new Error("Arrays must have same length.");
    }
    const total_p_hours = sum(performance_hours);
    const total_spent_hours = sum(spent_hours);
    return (eff_goal / 100) * ((total_spent_hours + 8) * (7.250 / 8)) - total_p_hours;
};

export const effInHours = (eff) => {
    return (Number(eff) / 100) * 7.25;
};

export const effDifference = (performances_1, performances_2) => {
    const eff1 = calcEfficiency(performances_1);
    const eff2 = calcEfficiency(performances_2);
    const diff = (Number(eff1) - Number(eff2)).toFixed(1);
    const percentage = (eff2 > 0 ? (diff / eff2) * 100 : 0.0).toFixed(2);
    return { diff, percentage };
};

export const phaseFromDate = (date) => {
    const d = new Date(date);
    const phase_start = d.getDate() <= 15 ? new Date(d.getFullYear(), d.getMonth(), 1) : new Date(d.getFullYear(), d.getMonth(), 16);
    const phase_end = d.getDate() <= 15 ? new Date(d.getFullYear(), d.getMonth(), 15) : new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return { phase_start, phase_end };
}