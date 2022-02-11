import * as React from 'react';
import Paper from '@mui/material/Paper';

const ItemList = (props) => {
	const items = props.items;
	console.log(items);
	const list = items.map((item) => <li key={item.when}>{item.what}</li>);
	return (
		<Paper>
		<h3>Storage</h3>
		<ul>{list}</ul>
		</Paper>
	);
}

export default ItemList;
