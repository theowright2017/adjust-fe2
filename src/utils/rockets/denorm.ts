import { InputMission } from "./filterConfig";

export interface OutputMission {
	flight_number: number;
	mission_name: string;
	payload_count: number;
}

export function denormForOutput(mission: InputMission): OutputMission {
	return {
		flight_number: mission.flight_number,
		mission_name: mission.mission_name,
		payload_count: mission.rocket.second_stage.payloads.length,
	};
}
