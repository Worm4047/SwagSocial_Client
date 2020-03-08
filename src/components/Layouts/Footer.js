import React from 'react';
import { Paper, Tabs, Tab} from '@material-ui/core/';


function Footer() {
	// const onIndexSelect = (e, index) => {
	// 	index === 0 ? '' : ''
	// }
	return (
		<Paper style={{bottom: 0}}>
			<Tabs
				value = {0}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label= "All" />
                <Tab label= "Current Attendance" key= "Current Attendance" />
				<Tab label= "Past Attendance" key= "Past Attendance" />
                <Tab label= "Stats" key= "Stats" />
				<Tab label= "Send Reminder" key= "Send Reminder" />
			</Tabs>
		</Paper>
	);
}

export default Footer;
