import { useEffect, useState } from "react";
import { FilterFunction, ProcessMissions } from "../utils/rockets/types";

function useFetchAndProcessRocketData<MissionI, MissionO, ParamsT>(
	processMissions: ProcessMissions<MissionI, MissionO, ParamsT>,
	processing: {
		filterFn: FilterFunction<MissionI, ParamsT>;
		sortFn: (missions: MissionI[]) => MissionI[];
		denormFn: (mission: MissionI) => MissionO;
	},
	fetchFn: () => Promise<MissionI[]>
) {
	const [missions, setMissions] = useState<MissionO[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchFn();

			const { filterFn, sortFn, denormFn } = processing;
			const missions = processMissions(fetchedData, filterFn, sortFn, denormFn);

			setIsLoading(false)
			setMissions(missions);
			
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {missions, isLoading};
}

export default useFetchAndProcessRocketData;
