<script>
    import { getEfficiencyByPhaseAndSection } from "$lib/apis/performancesApi.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import Loading from "../layout/Loading.svelte";
    import annotationPlugin from "chartjs-plugin-annotation";
    import {
        Chart,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
    } from "chart.js";

    Chart.register(
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        annotationPlugin,
    );
    const colors = ["#3b82f6", "#22c55e", "#ef4444", "#eab308", "#a855f7"];

    let canvas = $state();

    let sectionState = useSectionState();
    let efficiencies = $state(null);
    $effect(async () => {
        efficiencies = await getEfficiencyByPhaseAndSection();
    });
    const phase_starts = $derived(
        efficiencies
            ? [...new Set(efficiencies?.map((e) => e.phase_start))].reverse()
            : [],
    );
    const section_ids = $derived(
        efficiencies
            ? [...new Set(efficiencies?.map((e) => e.worksection))]
            : [],
    );

    const phases = $derived(
        efficiencies
            ? [
                  ...new Set(
                      efficiencies?.map(
                          (e) =>
                              `${new Date(e.phase_start).toLocaleDateString("fi-FI")} - ${new Date(e.phase_end).toLocaleDateString("fi-FI")}`,
                      ),
                  ),
              ].reverse()
            : [],
    );

    $effect(() => {
        if (!canvas || !efficiencies) return;

        const datasets = section_ids.map((section_id, index) => ({
            label:
                `${sectionState.getOne(section_id)?.name} (tavoite ${sectionState.getOne(section_id).goal} %)` ??
                "Tuntematon",

            data: phase_starts.map((phase) => {
                const entry = efficiencies.find(
                    (e) =>
                        e.worksection === section_id && e.phase_start === phase,
                );

                return entry ? Number(entry.efficiency) : null;
            }),

            backgroundColor: colors[index % colors.length],
        }));

        const goalAnnotations = Object.fromEntries(
            sectionState.sections.map((section) => [
                `goal-${section.id}`,
                {
                    type: "line",
                    yMin: section.goal,
                    yMax: section.goal,
                    borderWidth: 1,
                    borderDash: [4, 4],
                    label: {
                        display: true,
                        content: `${section.goal} %`,
                        position: "end",
                    },
                },
            ]),
        );

        const chart = new Chart(canvas, {
            type: "bar",

            data: {
                labels: phases,
                datasets,
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `${value}%`,
                        },
                    },
                },
                datasets: {
                    bar: {
                        barPercentage: 0.2,
                        categoryPercentage: 0.7,
                    },
                },
                plugins: {
                    annotation: {
                        annotations: {
                            baseline: {
                                type: "line",
                                yMin: 100,
                                yMax: 100,
                                borderWidth: 2,
                                borderDash: [6, 6],
                                label: {
                                    display: true,
                                    content: "100 %",
                                    position: "end",
                                },
                            },
                            ...goalAnnotations,
                        },
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    });
</script>

{#if efficiencies === null}
    <Loading />
{:else}
    <div class="w-full h-full">
        <canvas bind:this={canvas}></canvas>
    </div>
{/if}
