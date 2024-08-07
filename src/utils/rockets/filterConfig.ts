export interface InputMission {
	flight_number: number;
	mission_name: string;
	launch_year: number;
	launch_date_utc: string;
	rocket: {
		second_stage: {
			payloads: {
				customers: string[];
			}[];
		};
	};
}

export interface FilterParams {
	year: number;
	customerName: string;
}

export function filterByLaunchedInYearAndPayloadForCustomer(
	mission: InputMission,
	filterParams: FilterParams
) {
	const matchesLaunchYear = Number(mission.launch_year) === filterParams.year;
	const matchesPayload = mission.rocket.second_stage.payloads.some((payload) =>
		payload.customers.includes(filterParams.customerName)
	);
	return matchesLaunchYear && matchesPayload;
}
