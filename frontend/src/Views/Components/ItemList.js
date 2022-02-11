import * as React from 'react';

const ItemList = (props) => {
	const items = props.items;
	const list = items.map((item) => <li key={item.when}>{item.what}</li>);
	return (
		<ul>{list}</ul>
	);
}

export default ItemList;
