import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';

const options = [
	{ id: 1, isDone: true, text: 'Task number 1' },
	{ id: 2, isDone: false, text: 'Task number 2' },
	{ id: 3, isDone: false, text: 'Task number 3' },
];

describe('entities/todoList', () => {
	// коллекция тестов
	test('Todolist render', () => {
		render(<TodoList tasks={options} />); // Изолированный рендер
		expect(screen.getByTestId('isReady')).toBeInTheDocument(); // Ожидаем (селектор по тексту), результат (отрендрился)
	});

	test('Write task', async () => {
		render(<TodoList tasks={options} />); // Изолированный рендер
		await userEvent.type(screen.getByTestId('todoTaskInput'), 'Create task'); // имитация ввода значения
		expect(screen.getByTestId('todoTaskInput')).toHaveValue('Create task'); // результат (введен: Create task)
	});

	test('Adding task', async () => {
		render(<TodoList tasks={options} />); // Изолированный рендер
		await userEvent.type(screen.getByTestId('todoTaskInput'), 'Create task'); // имитация ввода значения
		expect(screen.getByTestId('todoTaskInput')).toHaveValue('Create task'); // результат (введен: Create task)
		await userEvent.click(screen.getByTestId('todoAddTask')); // имитация нажатия (селектор)
		expect(screen.getAllByTestId('task').length).toBe(4); // результат (получили на +1 таск в списке)
	});

	test('Using filters', async () => {
		render(<TodoList tasks={options} />); // Изолированный рендер
		await userEvent.click(screen.getByTestId('filterCompleted')); // имитация нажатия (селектор)
		expect(screen.getAllByTestId('task').length).toBe(1); // результат (все завершенные)

		await userEvent.click(screen.getByTestId('filterActive')); // имитация нажатия (селектор)
		expect(screen.getAllByTestId('task').length).toBe(2); // результат (все активные)

		await userEvent.click(screen.getByTestId('filterAll')); // имитация нажатия (селектор)
		expect(screen.getAllByTestId('task').length).toBe(3); // результат (вернули исходное состояние)
	});

	test('Task complited', async () => {
		render(<TodoList tasks={options} />); // Изолированный рендер
		await userEvent.click(screen.getByTestId('filterActive')); // имитация нажатия (селектор)
		expect(screen.getAllByTestId('task').length).toBe(2); // результат (все активные)

		await userEvent.click(screen.getByText('Task number 3')); // имитация нажатия (фокусим таску по тексту)
		expect(screen.getAllByTestId('task').length).toBe(1); // результат (1-на активная задача)
	});
});
