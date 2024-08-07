import { describe, it, expect } from "vitest";
import {
	SortByUtcAndPayload,
	sortToInverseChronByLaunchDateUTC,
} from "../sorting";

interface TestMission extends SortByUtcAndPayload {
	id: number;
}

describe("sorting function", () => {
	it("it should return in inverse chronological order", () => {
		const list: TestMission[] = [
			{
				id: 1,
				launch_date_utc: "2020-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: [],
					},
				},
			},
			{
				id: 2,
				launch_date_utc: "2021-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: [],
					},
				},
			},
			{
				id: 3,
				launch_date_utc: "2022-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: [],
					},
				},
			},
		];
		const sorted = sortToInverseChronByLaunchDateUTC(list);

		expect(sorted[0].id).toEqual(3);
		expect(sorted[1].id).toEqual(2);
		expect(sorted[2].id).toEqual(1);
	});

	it("should return in inverse chronological order, with identical dates being sorted by highest payload count first", () => {
		function createPayloads(count: number) {
			return Array.from({ length: count }, (_, idx) => {
				return { customers: [`${idx}`] };
			});
		}

		const list: TestMission[] = [
			{
				id: 1,
				launch_date_utc: "2020-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(4),
					},
				},
			},
			{
				id: 2,
				launch_date_utc: "2021-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(0),
					},
				},
			},
			{
				id: 3,
				launch_date_utc: "2022-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(20),
					},
				},
			},
			{
				id: 4,
				launch_date_utc: "2020-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(8),
					},
				},
			},
			{
				id: 5,
				launch_date_utc: "2020-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(12),
					},
				},
			},
			{
				id: 6,
				launch_date_utc: "2020-01-01T00:00:00.000Z",
				rocket: {
					second_stage: {
						payloads: createPayloads(25),
					},
				},
			},
		];
		const sorted = sortToInverseChronByLaunchDateUTC(list);

		console.log(sorted);

		expect(sorted[0].id).toEqual(3);
		expect(sorted[1].id).toEqual(2);
		expect(sorted[2].id).toEqual(6);
		expect(sorted[3].id).toEqual(5);
		expect(sorted[4].id).toEqual(4);
		expect(sorted[5].id).toEqual(1);
	});
});
