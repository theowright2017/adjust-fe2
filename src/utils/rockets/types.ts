export type ProcessMissions<MissionI, MissionO, ParamsT> = (
	missions: MissionI[],
	filterFunction: (mission: MissionI, params: ParamsT) => boolean,
	sortFunction: (missions: MissionI[]) => MissionI[],
	denormFunction: (mission: MissionI) => MissionO
) => MissionO[];

export type FilterFunction<MissionI, ParamsT> = (
	mission: MissionI,
	params: ParamsT
) => boolean;
