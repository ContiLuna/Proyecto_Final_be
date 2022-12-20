const Categoria = require('../models/CategoriaSchema');
const mongoose = require('mongoose');

const getAllCategories = async (req, res) => {
    const categorias = await Categoria.find();
    try {
        if (!categorias) {
            return res.status(404).json({
                mensaje: 'No se encontraron categorias',
                status: 404
            })
        }
        return res.status(200).json({
            mensaje: 'Categorias encontradas',
            status: 200,
            categorias
        })
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'Error en el servidor',
        })
    }
}

const getCategoryByID = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                mensaje: 'Id NO valido'
            })
        }
        if (!categoria) {
            return res.status(404).json({
                mensaje: 'Categoria no encontrada'
            })
        }
        res.status(200).json({
            mensaje: 'Categoria encontrada',
            categoria
        });
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'Error en el servidor',
        });
    }
}

const createCategory = async (req, res) => {
    const { nombre, estado } = req.body;
    const categoriExist = await Categoria.findOne({ nombre });

    try {
        if (categoriExist) {
            return res.status(400).json({
                mensaje: "Esta categoria ya existe"
            });
        }

        const newCategory = new Categoria({
            nombre,
            estado,
        });

        await newCategory.save()

        return res.status(201).json({
            mensaje: "Categoria creada",
            newCategory
        });

    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'Error en el servidor',
        });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Categoria.findByIdAndDelete(id);
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                mensaje: 'Id NO valido'
            });
        }
        if (!category) {
            return res.status(404).json({
                mensaje: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            mensaje: 'Categoria eliminada',
        });
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'Error en el servidor',
        });
    }

}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                mensaje: 'id invalido'
            })
        }
        const categoria = await Categoria.findByIdAndUpdate(id, { nombre, estado }, { new: true })
        if (!categoria) {
            return res.status(404).json({
                mensaje: 'Categoria no encontrada'
            })
        }

        res.status(200).json({
            mensaje: 'Categoria actualizada',
            categoria
        })
    } catch (error) {
        return res.status(500).json({
            error,
            mensaje: 'Error en el servidor',
        });
    }
}

module.exports = {
    getAllCategories,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory
}