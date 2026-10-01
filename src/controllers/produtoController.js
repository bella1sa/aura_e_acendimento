const Produto = require('../models/produto');

const produtoController = {
    listarTodos: async (req, res) => {
        try {
            const produtos = await Produto.listarTodos();
            return res.json(produtos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const produto = await Produto.buscarPorId(id);
            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }
            return res.json(produto);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    },

    criar: async (req, res) => {
        try {
            const { nome, descricao, aroma, preco, estoque, categoria_id } = req.body;
            if (!nome || !aroma || !preco || !categoria_id) {
                return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
            }
            const novoProduto = await Produto.criar(req.body);
            return res.status(201).json(novoProduto);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar produto' });
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const produtoDeletado = await Produto.deletar(id);
            if (!produtoDeletado) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }
            return res.json({ mensagem: 'Produto removido com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            return res.status(500).json({ mensagem: 'Erro ao deletar produto' });
        }
    }
};

module.exports = produtoController;