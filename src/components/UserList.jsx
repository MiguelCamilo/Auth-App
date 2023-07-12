import UserCards from "./UserCards.";

const UserList = ({ users }) => {
	return (
		<>
			{users.map((user) => (
				<UserCards
					key={user.id || user._id}
					id={user.id || user._id}
					profile={user.profile}
					firstName={user.firstName}
					lastName={user.lastName}
					about={user.about}
					jobTitle={user.jobTitle}
				/>
			))}
		</>
	);
};

export default UserList;
