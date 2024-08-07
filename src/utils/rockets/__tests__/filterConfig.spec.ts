import { describe, it, expect } from "vitest";
import {
	filterByLaunchedInYearAndPayloadForCustomer,
	FilterParams,
	InputMission,
} from "../filterConfig";

describe("filterByLaunchedYearAndPayloadForCustomer", () => {
	it("should filter by both launch year and payload", () => {
		const mission1: InputMission = {
			flight_number: 1,
			mission_name: "mission1",
			launch_year: 2022,
			launch_date_utc: "2022-01-01T00:00:00.000Z",
			rocket: {
				second_stage: {
					payloads: [
						{
							customers: ["c1", "c2"],
						},
					],
				},
			},
		};
		const mission2: InputMission = {
			flight_number: 2,
			mission_name: "mission2",
			launch_year: 2008,
			launch_date_utc: "2008-01-01T00:00:00.000Z",
			rocket: {
				second_stage: {
					payloads: [
						{
							customers: ["c5", "c4"],
						},
					],
				},
			},
		};
		const mission3: InputMission = {
			flight_number: 3,
			mission_name: "mission3",
			launch_year: 2022,
			launch_date_utc: "2022-01-01T00:00:00.000Z",
			rocket: {
				second_stage: {
					payloads: [
						{
							customers: ["c5", "c6"],
						},
					],
				},
			},
		};

		const params: FilterParams = { year: 2022, customerName: "c5" };
		expect(
			filterByLaunchedInYearAndPayloadForCustomer(mission1, params)
		).toEqual(false);
		expect(
			filterByLaunchedInYearAndPayloadForCustomer(mission2, params)
		).toEqual(false);
		expect(
			filterByLaunchedInYearAndPayloadForCustomer(mission3, params)
		).toEqual(true);
	});
});
