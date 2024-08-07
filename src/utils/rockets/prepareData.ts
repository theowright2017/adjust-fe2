import { ProcessMissions } from "./types";

export const BASE_URL = "https://api.spacexdata.com/v3";

function prepareData<MissionI, MissionO, ParamsT>(
	filterParams: ParamsT
): ProcessMissions<MissionI, MissionO, ParamsT> {
	return function processMissions(
		missions: MissionI[],
		filterFunction: (mission: MissionI, params: ParamsT) => boolean,
		sortFunction: (missions: MissionI[]) => MissionI[],
		denormFunction: (mission: MissionI) => MissionO
	): MissionO[] {
		const filteredMissions = missions.filter((mission) =>
			filterFunction(mission, filterParams)
		);
		const sortedMissions = sortFunction(filteredMissions);
		return sortedMissions.map((mission) => denormFunction(mission));
	};
}

export default prepareData;
