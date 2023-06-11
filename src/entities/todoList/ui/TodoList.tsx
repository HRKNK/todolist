import React, { ReactNode, useState } from 'react';
import Checkbox from 'react-custom-checkbox';

import CheckIcon from 'shared/assets/icons/check-mark-svgrepo-com.svg';

import cls from './TodoList.module.scss';

interface ITask {
	id: number;
	isDone: boolean;
	text: string;
}

type TSortStatus = 'all' | 'completed' | 'not completed';

interface TodoListProps {
	title?: string; // Заголовок компонента
	tasks: Array<ITask>; // Таски
}

export const TodoList = (props: TodoListProps): ReactNode => {
	const { title, tasks: init } = props;

	const [tasks, setTask] = useState<Array<ITask>>(init); // Инициализация
	const [newTask, setNewTask] = useState<string>(''); // Связывание инпута

	const [filter, setFilter] = useState<TSortStatus>('all'); // Вызвать перерендер при сортироваке
	const sortedByStatus = (tasks: Array<ITask>, typeSort: TSortStatus): Array<ITask> => {
		if (typeSort == 'completed') return tasks.filter((item) => item.isDone == true);
		if (typeSort == 'not completed') return tasks.filter((item) => item.isDone == !true);
		return tasks;
	};
	const result = sortedByStatus(tasks, filter);

	// const removeTask = (task: Pick<ITask, 'id'>): void => {
	// 	const sorted = tasks.filter((item) => item == task); // Отфильтровать по НЕ!совпадениям
	// 	setTask(sorted);
	// };

	// Изменяем сво-во объекта
	const changeCheckBox = (task: Pick<ITask, 'id'>): void => {
		const copyArray = [...tasks];
		const findTarget = copyArray.find((item) => item.id === task.id);
		findTarget.isDone = !findTarget.isDone;
		setTask(copyArray);
	};

	const addTask = (newTask: string): void => {
		if (!newTask.length) {
			alert('Value is empty!');
			return;
		}
		const toNormalize: ITask = {
			id: +new Date(),
			text: newTask,
			isDone: false,
		};
		setTask((prev) => [...prev, toNormalize]);
		setNewTask('');
	};

	return (
		<div data-testid="isReady" className={cls.todolist}>
			<h1>{title ? title : 'TODOS'}</h1>
			<div className={cls.todolist_card}>
				<div className={cls.todolist_items}>
					<div className={cls.todolist_input}>
						<input data-testid="todoTaskInput" placeholder="What needs to be done?" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
						<button data-testid="todoAddTask" onClick={() => addTask(newTask)}>
							ADD
						</button>
					</div>
					{result.map((task) => (
						<div data-testid="task" key={task.id} className={cls.todolist_item}>
							<Checkbox
								icon={<CheckIcon />}
								onChange={() => changeCheckBox(task)}
								checked={task.isDone}
								borderRadius={'50%'}
								borderWidth={1}
								size={20}
								borderColor="#808080"
								style={{ cursor: 'pointer', 'margin-left': '7px' }}
								label={task.isDone ? <s style={{ color: '#d9d9d9' }}>{task.text}</s> : <span>{task.text}</span>}
							/>
							{/* <button onClick={() => removeTask(task)}>[Remove]</button> */}
						</div>
					))}
				</div>
				<div className={cls.todolist_btn}>
					<button data-testid="filterAll" onClick={() => setFilter('all')}>
						All
					</button>
					<button data-testid="filterActive" onClick={() => setFilter('not completed')}>
						Active
					</button>
					<button data-testid="filterCompleted" onClick={() => setFilter('completed')}>
						Completed
					</button>
				</div>
			</div>
		</div>
	);
};
