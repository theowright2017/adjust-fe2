export interface SortByUtcAndPayload {
	launch_date_utc: string;
	rocket: {
		second_stage: {
			payloads: {
				customers: string[];
			}[];
		};
	};
}

export function sortToInverseChronByLaunchDateUTC<
	MissionI extends SortByUtcAndPayload
>(missions: MissionI[]): MissionI[] {
	const sortedMissions = missions.sort((a: MissionI, b: MissionI) => {
		const payloadCountA = a.rocket.second_stage.payloads.length;
		const payloadCountB = b.rocket.second_stage.payloads.length;

		const dateA = new Date(a.launch_date_utc).getTime();
		const dateB = new Date(b.launch_date_utc).getTime();

		if (dateA < dateB) {
			return 1;
		} else if (dateA > dateB) {
			return -1;
		} else {
			return payloadCountB - payloadCountA;
		}
	});

	return sortedMissions;
}
