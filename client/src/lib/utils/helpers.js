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