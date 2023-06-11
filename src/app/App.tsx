import React, { useState } from 'react';
import { TodoList } from 'entities/todoList/ui/TodoList';

export const App = () => {
	// Инициализация
	const kit = [
		{ id: 1, isDone: false, text: 'Тестовое задание' },
		{ id: 2, isDone: true, text: 'Прекрасный код' },
		{ id: 3, isDone: false, text: 'Покрытие тестами' },
	];

	return (
		<>
			<TodoList title="todos" tasks={kit}></TodoList>
		</>
	);
};
