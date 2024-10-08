const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
    {id: 1, actividad: 'Ejercicio'},
    {id: 2, actividad: 'Cocinar'},
    {id: 3, actividad: 'Estudiar'},
    {id: 4, actividad: 'Leer'},
    {id: 5, actividad: 'Dormir'}
];

// GET: obtener todas las actividades
app.get('/todos', (req,res) => {
    res.json (todos);
});

// GET: obtener una actividad por ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Actividad no encontrada');
    }
});

// POST: crear una nueva actividad
app.post('/todos', (req, res) => {
    const nuevaActividad = {
        id: todos.length + 1,
        actividad: req.body.actividad
    };
    todos.push(nuevaActividad);
    res.status(201).json(nuevaActividad);
});

// PUT: actualizar una actividad existente por ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.actividad = req.body.actividad;
        res.json(todo);
    } else {
        res.status(404).send('Actividad no encontrada');
    }
});

// DELETE: eliminar una actividad por ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(e => e.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.send('Actividad eliminada');
    } else {
        res.status(404).send('Actividad no encontrada');
    }
});

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`El servidor ejecutado en http://localhost:${PORT}`);
});
