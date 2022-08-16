import close from '../assets/images/close.png';
import pencil from '../assets/images/pencil.svg';

function ListItem(props) {
	const listItem = props.listItem;
	const date = listItem.date;
	const km = listItem.km;
	const changeItem = () => props.changeItem(listItem);
	const removeItem = () => props.removeItem(listItem);

	return (
		<div className="listItem">
			<div className="listItem-data">
				{date}
			</div>
			<div className="listItem-km">
				{km}
			</div>
			<div className="listItem-actions">
				<button type='button' onClick={changeItem} className='listItem-btn'>
					<img src={pencil} className='listItem-icon' alt="asd" />
				</button>
				<button type='button' onClick={removeItem} className='listItem-btn'>
					<img src={close} className='listItem-icon' alt="asd" />
				</button>
			</div>
		</div>
	);
}

export default ListItem;