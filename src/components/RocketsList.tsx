import useFetchAndProcessRocketData from "../hooks/useFetchRocketData";
import { apiGET } from "../services/api";
import prepareData, { BASE_URL } from "../utils/rockets/prepareData";
import {
	filterByLaunchedInYearAndPayloadForCustomer,
	InputMission,
	FilterParams,
} from "../utils/rockets/filterConfig";
import { sortToInverseChronByLaunchDateUTC } from "../utils/rockets/sorting";
import { denormForOutput, OutputMission } from "../utils/rockets/denorm";

async function fetchMissions(): Promise<InputMission[]> {
	const data = await apiGET(BASE_URL + "/launches/past");
	return data;
}

const RocketsList = (props: { filterParams: FilterParams }) => {
	const { missions, isLoading } = useFetchAndProcessRocketData(
		prepareData<InputMission, OutputMission, FilterParams>(props.filterParams),
		{
			filterFn: filterByLaunchedInYearAndPayloadForCustomer,
			sortFn: sortToInverseChronByLaunchDateUTC,
			denormFn: denormForOutput,
		},
		fetchMissions
	);

	return (
		<div>
			{/* if i had more time, i would use a better approach then tertiary for loading and no data.
				happy to discuss further */}
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{missions.length ? missions.map((mission) => {
						return (
							<li
								key={mission.flight_number}
								style={{ listStyleType: "none", fontWeight: "bold" }}
							>
								{`#${mission.flight_number} ${mission.mission_name} (${mission.payload_count})`}
							</li>
						);
					}) : <p>No data</p>}
				</ul>
			)}
		</div>
	);
};



export default RocketsList;
