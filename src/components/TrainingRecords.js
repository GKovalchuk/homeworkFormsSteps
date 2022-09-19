import React, { useState } from 'react';
import List from './List.js';
import ListModel from './ListModel.js';

function TrainingRecords() {
	const [listItems, setListItems] = useState([]);

	function normalizeDate(date) {
		if (date[4] === '-') {
			let dd = date.slice(8);
			let mm = date.slice(5, 7);
			let yyyy = date.slice(0, 4);

			return dd + '.' + mm + '.' + yyyy;

		} else if (date[2] === '.') {
			let dd = date.slice(0, 2);
			let mm = date.slice(3, 5);
			let yyyy = date.slice(6);

			return yyyy + '-' + mm + '-' + dd;
		} else if (date.length === 8) {
			let dd = date.slice(6);
			let mm = date.slice(4, 6);
			let yyyy = date.slice(0, 4);

			return dd + '.' + mm + '.' + yyyy;
		}
	}

	function getDate() {
		let today = new Date()
		today.setHours(today.getHours() + 3);
		return today.toISOString().slice(0, 10)
	}

	function listDateSort(list) {
		for (let item of list) {
			item.date = item.date.split('.').reverse().join('');
		}
		list.sort((a, b) => a.date > b.date ? 1 : -1);
		for (let item of list) {
			item.date = normalizeDate(item.date);
		}
		return list;
	}

	const [form, setForm] = useState({
		date: getDate(),
		km: '',
	});

	const handleChange = ({ target }) => {
		const name = target.name;
		const value = target.value;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	}

	const handleSubmit = evt => {
		evt.preventDefault();
		const date = normalizeDate(form.date);
		const listItem = new ListModel(date, form.km);
		let flag = true;

		for (let item of listItems) {
			if (item.date === date) {
				item.km = String(Number(item.km) + Number(listItem.km));
				flag = false;
				break;
			}
		}

		if (flag) {
			setListItems(prevListItems => listDateSort([...prevListItems, listItem]));
		}

		setForm({
			date: getDate(),
			km: ''
		});
	}

	const changeItem = (listItem) => {
		removeItem(listItem);
		setForm({ date: normalizeDate(listItem.date), km: listItem.km });
	}

	const removeItem = (listItem) => {
		setListItems(prevListItems => prevListItems.filter(listItems => listItems.date !== listItem.date));
	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<div className="formTop">
					<div className="formTop-input">
						<label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
						<input type="date" name='date' id="date" value={form.date} onChange={handleChange} />
					</div>
					<div className="formTop-input">
						<label htmlFor="km">Пройдено км</label>
						<input type="text" name='km' id="km" value={form.km} onChange={handleChange} placeholder='enter distance' />
					</div>
					<button type='submit' className="formTop-btn">
						OK
					</button>
				</div>
			</form>
			<List listItems={listItems}
				changeItem={changeItem}
				removeItem={removeItem}
			/>
		</React.Fragment>
	);
}

export default TrainingRecords;