const Pedido = require('../models/pedido');

const pedidoController = {
    criar: async (req, res) => {
        try {
            const { cliente_nome, cliente_whatsapp, itens } = req.body;
            
            if (!cliente_nome || !cliente_whatsapp || !itens || itens.length === 0) {
                return res.status(400).json({ mensagem: 'Informe o nome, WhatsApp e pelo menos um item.' });
            }

            const novoPedido = await Pedido.criar(cliente_nome, cliente_whatsapp, itens);
            return res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido: novoPedido });
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            return res.status(500).json({ mensagem: 'Erro ao processar o pedido' });
        }
    },

    listarTodos: async (req, res) => {
        try {
            const pedidos = await Pedido.listarTodos();
            return res.json(pedidos);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    }
};

module.exports = pedidoController;