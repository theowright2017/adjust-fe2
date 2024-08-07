import RocketsList from "../components/RocketsList";

const Rockets = () => {
	return (
		<div>
			<RocketsList filterParams={{ year: 2018, customerName: "NASA" }} />
		</div>
	);
};

export default Rockets;
