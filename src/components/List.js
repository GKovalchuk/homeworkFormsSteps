import ListItem from './ListItem.js';

function List(props) {
	const listItems = props.listItems;

	return (
		<div className="formBottom">
			<p>Дата (ДД.ММ.ГГ)</p>
			<p>Пройдено км</p>
			<p>Действия</p>
			<div className="listsField">
				{listItems.map(listItem => <ListItem
					key={listItem.date}
					listItem={listItem}
					changeItem={props.changeItem}
					removeItem={props.removeItem}
				/>)}
			</div>
		</div>
	);
}

export default List;