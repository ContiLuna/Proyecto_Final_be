const Pedido = require("../models/PedidoSchema");
const mongoose = require("mongoose");

const getPedidos = async (req, res) => {
  // trae todos los pedidos
  // traer todos los pedidos
  const pedidos = await Pedido.find().populate("usuario").populate("menu");
  try {
    if (!pedidos) {
      return res.status(404).json({
        mensaje: "no se encontro pedido",
        status: 404,
      });
    }
    return res.status(200).json({
      mensaje: "pedidos encontrados",
      status: 200,
      pedidos,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      mensaje: "error en el servidor",
    });
  }
};

const getPedidosByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidos = await Pedido.find({ usuario: id })
      .populate("usuario")
      .populate("menu")
      .sort({ fecha: -1 });

    if (pedidos.length === 0) {
      return res.status(404).json({
        mensaje: "no se encontraron pedidos para este usuario",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "pedidos encontrados",
      status: 200,
      pedidos,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      mensaje: "error en el servidor",
    });
  }
};

// traer pedido por Id
const getPedidoByID = async (req, res) => {
  const { id } = req.params;
  const pedido = await Pedido.findById(id);
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      mensaje: "id invalido",
    });
  }
  if (!pedido) {
    return res.status(404).json({
      mensaje: "pedido no encontrado",
    });
  }
  res.status(200).json({
    mensaje: "pedido encontrado",
    pedido,
  });
};

// crear un pedido
// crear menu
const createPedido = async (req, res) => {
  const { usuario, fecha,cantidad, menu, pedido, monto } = req.body;

  try {
    const newPedido = new Pedido({
      usuario,
      fecha,
      menu,
      cantidad,
      estado: "pendiente",
      pedido,
      monto
    });

    await newPedido.save();

    return res.status(201).json({
      mensaje: "Pedido creado",
      newPedido,
    });
  } catch (error) {
    console.log(error);
  }
};

//actualizar estado del pedido
const updateEstadoPedido = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        mensaje: "id invalido",
      });
    }
    const pedido = await Pedido.findById(id)
      .populate("usuario")
      .populate("menu");
    if (!pedido) {
      return res.status(404).json({
        mensaje: "pedido no encontrado",
      });
    }
    pedido.estado = estado;
    await pedido.save();
    res.status(200).json({
      mensaje: "pedido actualizado",
      pedido,
    });
  } catch (error) {
    console.log(error);
  }
};

// actualizar pedido
const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { usuario, fecha, menu, pedido } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        mensaje: "id invalido",
      });
    }
    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { usuario, fecha, menu, pedido },
      { new: true }
    );
    if (!pedido) {
      return res.status(404).json({
        mensaje: "pedido no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "pedido actualizado",
      pedido,
    });
  } catch (error) {
    console.log(error);
  }
};

// eliminar pedido
const deletePedido = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({
        mensaje: "id invalido",
      });
    }
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) {
      return res.status(404).json({
        mensaje: "pedido no encontrado",
      });
    }
    res.status(200).json({
      mensaje: "pedido eliminado",
      pedido,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPedidos,
  getPedidoByID,
  createPedido,
  updatePedido,
  deletePedido,
  updateEstadoPedido,
  getPedidosByUser
};
